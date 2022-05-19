import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { commonclass } from 'src/app/common/common';
import { ApiServicesService } from 'src/app/services/api-services.service'
import { AWSKeyManagementConfig } from 'src/app/config/app.config';
import { AwsKeyManagementService } from 'src/app/services/aws-key-management.service';
import { DownloadKeyComponent } from './download-key/download-key.component';
import { AssignedKeyModalComponent } from './assigned-key-modal/assigned-key-modal.component';
export interface PeriodicElement {
  aliases: string;
  keyid: string;
  status: string;
  keyspec: string;
  keyusage: string;
  date: string;
  action: any;
}
@Component({
  selector: 'app-aws-managed-keys',
  templateUrl: './aws-managed-keys.component.html',
  styleUrls: ['./aws-managed-keys.component.scss'],
})
export class AwsManagedKeysComponent implements OnInit {
  awsKeysList: any;
  responseCount: any;
  loading: boolean = true;
  rows: number = 10;
  first: number = 0;
  pageNumber: number = 0;

  limit: string | number | null = null;
  offset: string | number = 0;
  sort_by: string | null = null;
  globalSearch: string | null = null;
  sort_order: string | null = null;
  search_by: string | null = null;
  search_value: string | null = null;

  headerColumns: any = [
    { field: 'key_alias', header: 'Aliases' },
    { field: 'key_id', header: 'Key ID' },
    { field: 'status', header: 'Status' },
    { field: 'key_spec', header: 'Key Spec' },
    { field: 'key_usage', header: 'Key Usage' },
    { field: 'created_time', header: 'Creation Date' },
    { field: 'download', header: '' },
  ];

  constructor(
    private loader: commonclass,
    private dialog: MatDialog,
    private apis : ApiServicesService,
    public awsKeyMgmtService: AwsKeyManagementService
  ) {}

  ngOnInit(): void {
    this.loader.showLoader('start');
    this.getAwsKeysList();
    this.loader.showLoader('stop');
    this.pageNumber = (+this.offset + this.rows) / this.rows;
  }

  /**
   * Function that executes fro every prime table events.
   */
  onLazyLoad(params: any) {
    this.loading = true;
    this.awsKeysSharedParams(params);
  }

  /**
   * Function to capture or set all the queryparams needed.
   */
  awsKeysSharedParams(params: {
    first: string;
    sortField: string;
    sortOrder: any;
    filters: string[];
    rows: string;
  }): void {
    this.first = 0;
    const { first, sortField, sortOrder, filters, rows } = params;
    this.globalSearch = null;
    this.search_by = null;
    this.search_value = null;
    this.sort_by = null;
    this.sort_order = null;
    this.offset = first || this.first.toString();
    this.limit = rows || AWSKeyManagementConfig.itemsPerPage.toString();
    this.sort_by =
      sortField || AWSKeyManagementConfig.getKeyParams[0]['sort_by'];
    this.sort_order = sortOrder === 1 ? 'asc' : 'desc';
    this.getAwsKeysList({
      limit: this.limit,
      offset: this.offset,
      sort_by: this.sort_by,
      globalSearch: this.globalSearch,
      sort_order: this.sort_order,
    });
  }

  /**
   * Fetches the aws key lists from server.
   */
  getAwsKeysList(qs?: any): void {
    this.awsKeyMgmtService.getAwsKeys(qs).subscribe(
      (res) => {
        try {
          let data;
          data = res['rows'].map((res: any) => ({
            id: res?.id,
            key_alias: res?.key_alias ?? '',
            key_id: res?.key_id ?? '',
            status: res?.status ?? '',
            key_spec: res?.key_spec ?? '',
            key_usage: res?.key_usage ?? '',
            created_time: res?.created_time ?? '',
          }));
          this.awsKeysList = data;
          this.responseCount = res['count'];
          this.loading = false;
        } catch (e) {
          console.error(e);
          this.loading = false;
        }
      },
      (error) => {
        console.error(error.message);
        this.loading = false;
      }
    );
  }

  /**
   * Function to fetch data for the public key to be downloaded.
   */
  getKeyID(keysListData: any) {
    this.loading = true;
    let keyId = keysListData.key_id;
    this.awsKeyMgmtService.getPublicKeyForDownload({ keyId }).subscribe(
      (public_key: any) => {
        this.downloadKeyFile(public_key);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  /**
   * Function to download the public key file as a pem file.
   */
  downloadKeyFile(public_key: any) {
    const blob = new Blob([public_key], {
      type: 'application/text',
    });
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.autoFocus = true;
    dialogConfig.data = {
      blobUrl: window.URL.createObjectURL(blob),
      fileType: 'public_key',
    };
    this.dialog.open(DownloadKeyComponent, dialogConfig);
    this.loading = false;
  }

  setSearchOptionValue(value: any) {
    this.loading = true;
    let search_value = value?.target?.value;
    this.getAwsKeysList({ search_value });
  }

  /**
   * Functions for customised programmatic pagination.
   */
  next() {
    this.loading = true;
    this.first = this.first + this.rows;
    this.pageNumber = (this.first + this.rows) / this.rows;
    this.getAwsKeysList({
      offset: this.first,
    });
  }

  /**
   * Functions for customised programmatic pagination.
   */
  prev() {
    this.loading = true;
    this.first = this.first - this.rows;
    this.pageNumber = (this.first + this.rows) / this.rows;
    this.getAwsKeysList({
      offset: this.first,
    });
  }

  reset() {
    this.first = 0;
  }
  /**
   * Function to disable the next chevron if no result.
   */
  isLastPage(): any {
    if (this.responseCount < this.rows) {
      return true;
    } else {
      if (this.awsKeysList?.length) {
        if (this.loading) return true;
        return this.awsKeysList?.length < this.rows ? true : false;
      } else {
        return true;
      }
    }
  }

  /**
   * Function to disable the previous chevron if no previous data.
   */
  isFirstPage(): boolean {
    if (this.awsKeysList) {
      if (this.loading) return true;
      return this.first === 0;
    } else {
      return true;
    }
  }

  openViewDialog(keyList:any){
    let dataList = {}
    if(keyList.id){
      this.apis.sendGetRequest('getassignedusers/'+keyList.id).subscribe((result)=>{
      dataList = result;
      this.dialog.open(AssignedKeyModalComponent, {
        data: dataList
      })
      });
    }
}
}
