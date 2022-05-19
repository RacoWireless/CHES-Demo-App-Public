import { Variable } from '@angular/compiler/src/render3/r3_ast';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { commonclass } from 'src/app/common/common';
import { AwsKeyManagementService } from 'src/app/services/aws-key-management.service';

@Component({
  selector: 'app-aws-create-key',
  templateUrl: './aws-create-key.component.html',
  styleUrls: ['./aws-create-key.component.scss'],
})
export class AwsCreateKeyComponent implements OnInit {
  type1: any;
  type2: any;
  usage1: any;
  usage2: any;
  activeIndex: number = 0;
  keyTypeSelected: boolean = false;
  keyUsageSelected: boolean = false;
  keyalias: string = '';
  keydescription: string = '';
  loading: boolean = true;

  @ViewChild('key_alias', { static: true }) keyAlias: ElementRef;
  @ViewChild('key_description', { static: true }) keyDescription: ElementRef;
  constructor(
    public awsKeyMgmtService: AwsKeyManagementService,
    private snackBar: MatSnackBar,
    private router: Router,
    private loader: commonclass
  ) {}

  ngOnInit(): void {
    document.getElementById('key-management')?.classList.add('active');
  }

  optiontype(evnt: any) {
    this.resetcard_type();
    this.keyTypeSelected = !this.keyTypeSelected;
    this.keyTypeSelected
      ? evnt.currentTarget.classList.add('active')
      : evnt.currentTarget.classList.remove('active');
  }

  optionusage(evnt: any) {
    this.resetcard_usage();
    this.keyUsageSelected = !this.keyUsageSelected;
    this.keyUsageSelected
      ? evnt.currentTarget.classList.add('active')
      : evnt.currentTarget.classList.remove('active');
  }

  checkConfigureKeyNext(): boolean {
    if (this.keyTypeSelected && this.keyUsageSelected) {
      return false;
    } else {
      return true;
    }
  }

  checkAliasInput() {
    if (this.keyalias?.match(/[^a-z0-9_-]/gi)) {
      this.keyalias = this.keyalias.replace(/[^a-z0-9_-]/gi, '');
    }
    if (this.keyalias) {
      return false;
    } else {
      return true;
    }
  }

  checkDescriptionInput() {
    if (this.keydescription) {
      this.keydescription = this.keydescription.slice(0, 100);
    }
  }

  getValues() {}

  createKeyFile() {
    this.loader.showLoader('start');
    this.awsKeyMgmtService
      .createPublicKey(this.keyalias, this.keydescription)
      .subscribe(
        (response) => {
          let status = {
            message: 'Key created Successfully!',
            action: 'close',
          };
          this.openSnackBar(status);
          this.loader.showLoader('stop');
          this.router.navigate(['/key-management']);
        },
        (error) => {
          let status = {
            message: error?.error?.error ?? error?.message,
            action: 'close',
          };
          this.openSnackBar(status);
          this.loader.showLoader('stop');
        }
      );
  }

  /**
   * Opens snack bar
   * @param status
   */
  openSnackBar(status: any) {
    this.snackBar.open(status.message, status.action, { duration: 3000 });
  }

  resetcard_type() {
    this.type1 = document.getElementById('type1');
    this.type2 = document.getElementById('type2');
    this.type1.classList.remove('active');
    this.type2.classList.remove('active');
  }

  resetcard_usage() {
    this.usage1 = document.getElementById('usage1');
    this.usage2 = document.getElementById('usage2');
    this.usage1.classList.remove('active');
    this.usage2.classList.remove('active');
  }

  ngOnDestroy() {
    document.getElementById('key-management')?.classList.remove('active');
  }
}
