import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { commonclass } from 'src/app/common/common';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { Table } from 'primeng/table';
import { Column, PeripheralLists, SortOrder } from 'src/app/models/model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-telemetry-data',
  templateUrl: './telemetry-data.component.html',
  styleUrls: ['./telemetry-data.component.scss'],
})
export class TelemetryDataComponent implements OnInit, OnDestroy {
  peripheralCount = 0;
  peripheralDetailsList: PeripheralLists[];
  patientId: String | null;
  sharedUserId: String | null;
  listLimitOptions = [10, 25, 50];
  listLimit: number = this.listLimitOptions[0];
  listFirst: number = 0;
  refreshInterval: NodeJS.Timeout;
  patientInformation: any;
  reasonCodeDefault: string = "OK"
  sortOrderOptions: SortOrder[] = [
    { sort_order: 'asc', prime_table_sort_order: 1 },
    { sort_order: 'desc', prime_table_sort_order: -1 },
  ];
  columns: Column[] = [
    {
      field: 'device_type',
      header: 'Peripheral',
      is_filter_enabled: true,
      is_sort_enabled: true,
    },
    {
      field: 'make',
      header: 'Make / Model',
      is_filter_enabled: false,
      is_sort_enabled: true,
    },
    {
      field: 'telemetry_data',
      header: 'Telemetry Data',
      is_filter_enabled: false,
      is_sort_enabled: false,
    },
    {
      field: 'last_reading',
      header: 'Reading Taken',
      is_filter_enabled: false,
      is_sort_enabled: true,
    },
    {
      field: 'created_time',
      header: 'Received Time',
      is_filter_enabled: false,
      is_sort_enabled: true,
    },
    {
      field: 'reason_code',
      header: 'Status Code',
      is_filter_enabled: false,
      is_sort_enabled: true,
    },
  ];
  defaultSortField = this.columns[4].field;
  defaultSortOrder = this.sortOrderOptions[1];
  peripheralListParams = {
    limit: this.listLimit,
    offset: this.listFirst,
    nopaging: 0,
    sort_by: this.defaultSortField,
    search_by: '',
    search_value: '',
    sort_order: this.defaultSortOrder.sort_order,
  };
  isLoading = false;
  currentFilterField = '';
  currentFilterKey = '';
  resetGlobalFilter = false;
  useGlobalFilter = false;

  constructor(
    private loader: commonclass,
    private route: ActivatedRoute,
    private apiServices: ApiServicesService,
    private cdf: ChangeDetectorRef,
    private location: Location,
    public router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById('patient-information')?.classList.add('active');

    this.patientInformation = this.location.getState();
    this.patientId = this.patientInformation?.patientId;
    this.sharedUserId = this.patientInformation?.sharedUserId;

    this.checkPageValidity(this.patientInformation);

    this.getPeripheralsList();
    this.refreshTelemetryData();

    this.loader.showLoader('start');
    this.loader.showLoader('stop');
  }

  /**
   * This method is executed to check if the page is loaded from a hyperlink
   *  or not and redirects back if not.
   * @param params This param contains details of values passed from other page.
   * @return void Does not return anything.
   */
  checkPageValidity(params: { sharedUserId: any; patientId: any }) {
    if (!params?.sharedUserId || !params?.patientId) {
      this.router.navigate(['/managedevice']);
    }
  }

  /**
   * Refreshes telemetry data every 30 seconds
   */
  refreshTelemetryData() {
    this.refreshInterval = setInterval(() => {
      this.getPeripheralsList(false);
    }, 5000);
  }

  /**
   * Gets peripherals list
   * @param data
   */
  getPeripheralsList(showLoadingAnimation = true) {
    this.isLoading = showLoadingAnimation;
    this.apiServices
      .sendGetRequest(
        `telemetry-data/${this.sharedUserId}`,
        this.peripheralListParams
      )
      .subscribe((response) => {
        this.peripheralCount = response.count;
        this.peripheralDetailsList = response.rows.map(
          (x: PeripheralLists) => ({
            device_type: x.device_type,
            make: x.make + '-' + x.model,
            telemetry_data: x.telemetry_data,
            last_reading: x.last_reading,
            created_time: x.created_time,
            reason_code: x.reason_code?x.reason_code:this.reasonCodeDefault
          })
        );
        this.isLoading = false;
      });
  }

  /**
   * Determines whether telemetry data field is valid
   * @param field
   * @returns boolean
   */
  isTelemetryDataFieldValid(field: JSON) {
    if (!('message' in field)) return true;
    return false;
  }

  /**
   * Separate telemetry data value and unit
   * @param data
   * @returns telemetry data value
   */
  getTelemetryDataValue(data: any) {
    try {
      const value = data?.split(' ');
    if(value) return value[0];
    return ''
    } catch (error) {
      return '';
    }
  }

  /**
   * Separate telemetry data value and unit
   * @param data
   * @returns telemetry data value's unit
   */
  getTelemetryDataUnit(data: any) {
    try {
      const unit = data.split(' ');
      if (unit.length == 3) {
        return unit[1] + ' ' + unit[2];
      } else return unit[1];
    } catch (error) {
      return '';
    }
    
    
  }

  /**
   * Gets spirometer telemetry data unit
   * @param data 
   * @returns  
   */
  getSpirometerTelemetryDataUnit(data: any) {
    try {
      const unit = data.split(' ');
      if (unit.length >= 2) return unit[1];
      return '';
    } catch (error) {
      return ''
    }
   
  }

  /**
   * Gets spirometer telemetry data key
   * @param data 
   * @returns  
   */
  getSpirometerTelemetryDataKey(data: any) {
    try {
      const unit = data.split(' ');
      if (unit.length == 3) return unit[2];
      return '';
    } catch (error) {
      return ''
    }
    
  }

  /**
   * Closes opened filter wrapper
   */
  private closeOpenedFilterWrapper(clearFieldValues?: Boolean) {
    const otherWrapper = document.querySelectorAll('.filter-wrapper');
    otherWrapper.forEach((x) => {
      (x as HTMLDivElement).style.display = 'none';
      if (clearFieldValues) {
        (x as HTMLDivElement).getElementsByTagName('input')[0].value = '';
      }
    });
  }

  /**
   * This method is executed to display the column wise search filter box.
   * @param event This param contains a mouse event.
   * @param wrapperSelector This param contains a combination of field name and '-input'.
   * @param columnFieldId unique identifier for the column, clicked filter field value
   * @return void Does not return anything.
   */
  showFilterBox(
    event: MouseEvent,
    wrapperSelector: string,
    columnFieldId: string
  ) {
    event.stopPropagation();
    this.closeOpenedFilterWrapper();
    const el = document.querySelector(`.${wrapperSelector}`) as HTMLDivElement;
    el.style.display = 'flex';
    // clears historic value in filter field if not current filter field
    if (this.currentFilterField !== columnFieldId) {
      el.getElementsByTagName('input')[0].value = '';
    }
  }

  /**
   * Stops propagation on filter
   * @param event
   */
  stopPropagationOnFilter(event: MouseEvent): void {
    event.stopPropagation();
  }

  /**
   * Sets search option value
   * @param searchBy
   * @param value
   */
  setSearchOptionValue(searchBy: string, value: string) {
    this.currentFilterField = searchBy;
    this.useGlobalFilter = false;
  }

  /**
   * This method is executed when filtering is done.
   * @param wrapperSelector This param contains a combination of field name and '-input'.
   * @return void Does not return anything.
   */
  onFilterDone(wrapperSelector: string) {
    const el = document.querySelector(`.${wrapperSelector}`) as HTMLDivElement;
    el.style.display = 'none';
  }

  /**
   * Determines whether lazy load on
   * @param event
   */
  onLazyLoad(event: any) {
    this.peripheralListParams.offset = event.first;
    this.peripheralListParams.limit = event.rows;
    this.peripheralListParams.sort_by =
      event.sortField || this.defaultSortField;

    const sortOrder = this.sortOrderOptions.find((option) => {
      return event.sortOrder === option.prime_table_sort_order;
    });
    this.peripheralListParams.sort_order =
      sortOrder?.sort_order || this.defaultSortOrder.sort_order;

    if (
      this.columns
        .map((column) => column.field)
        .includes(this.currentFilterField) &&
      !this.useGlobalFilter
    ) {
      this.peripheralListParams.search_by = this.currentFilterField;
      this.currentFilterKey =
        event?.filters[this.currentFilterField]?.value?.value || '';
      this.peripheralListParams.search_value = this.currentFilterKey;
    } else {
      this.peripheralListParams.search_by = this.currentFilterField;
      this.peripheralListParams.search_value = this.currentFilterKey;
    }

    this.getPeripheralsList();
  }

  /**
   * Resets global filter component
   */
  resetGlobalFilterComponent() {
    this.resetGlobalFilter = true;
    this.cdf.detectChanges();
    this.resetGlobalFilter = false;
    this.cdf.detectChanges();
  }

  /**
   * Resets query params
   */
  resetQueryParams() {
    this.peripheralListParams = {
      limit: this.listLimit,
      offset: this.listFirst,
      nopaging: 0,
      sort_by: this.defaultSortField,
      search_by: '',
      search_value: '',
      sort_order: this.defaultSortOrder.sort_order,
    };
  }

  /**
   * Resets filters and the table all together
   * @param table
   */
  resetFilters(table: Table) {
    table.filters = {};
    this.currentFilterField = '';
    this.currentFilterKey = '';
    this.useGlobalFilter = false;
    this.closeOpenedFilterWrapper();
    this.resetGlobalFilterComponent();
    table.reset();
  }

  /**
   * Globals filter allow filter by any
   * @param event
   */
  globalFilter(event: any) {
    // clear all values present in their input fields
    const clearLocalFilterValues = true;
    // closes all open local filter boxes
    this.closeOpenedFilterWrapper(clearLocalFilterValues);

    // to give more priority to the global search
    this.useGlobalFilter = true;

    this.listFirst = 0;

    // Moves pagination to first page with searched
    this.peripheralListParams.offset = this.listFirst;
    this.peripheralListParams.limit = this.listLimit;

    this.currentFilterField = event.search_by;
    const globalSearchColumns = event.columns.filter((column: any) => {
      return column?.is_filter_enabled;
    });

    if (
      globalSearchColumns
        .map((column: any) => column.field)
        .includes(this.currentFilterField)
    ) {
      this.peripheralListParams.search_by = this.currentFilterField;
      this.currentFilterKey = event.search_value;
      this.peripheralListParams.search_value = this.currentFilterKey;
    }

    this.getPeripheralsList();
  }

  ngOnDestroy() {
    document.getElementById('patient-information')?.classList.remove('active');

    clearInterval(this.refreshInterval);
  }
}
