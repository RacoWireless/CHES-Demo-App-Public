import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { GlobalConfig } from 'src/app/config/app.config';
import { EncryptionKeys, PatientLists } from 'src/app/models/model';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-assign-encryption-key',
  templateUrl: './assign-encryption-key.component.html',
  styleUrls: ['./assign-encryption-key.component.scss']
})
export class AssignEncryptionKeyComponent implements OnInit {
  @Output() emitForm = new EventEmitter<FormGroup>();

  private now: Date = new Date();
  encryptionKeyForm: FormGroup;
  public enc_key: EncryptionKeys[] = [];
  public patient_list: PatientLists[] = [];
  public disable_status: boolean = true;
  public key_type: string = 'patient';
  public select_status: boolean = false;
  public status_patient: string = 'Select Patient ID';
  public status_msg: string = 'Select encryption Key file';
  public timezone: any = GlobalConfig.TIMESTANDARD;
  public enc_key_type: any[] = [
    { value: 'patient', title: 'Patient' },
    { value: 'organization', title: 'Organization' },
  ];

  constructor(private apis: ApiServicesService) {
    this.encryptionKeyForm = new FormGroup({
      key_file: new FormControl('', [Validators.required]),
      key_type: new FormControl('', [Validators.required]),
      enc_timezone: new FormControl('', [Validators.required]),
      enc_date: new FormControl(this.currentDate(), [Validators.required]),
      enc_time: new FormControl(this.currentTime(), [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getValues();
  }
  /*
  get current date
  */
  currentDate() {
    return this.now.toISOString().substring(0, 10);
  }
  /*
get current time
*/
  currentTime() {
    const currentHour = this.now.getHours();
    const currentMinutes = this.now.getMinutes();
    let getHour = currentHour.toString()
    let getTime = currentMinutes.toString()
    if (currentHour < 10) {
      getHour = '0' + currentHour;
    }
    if (currentMinutes < 10) {
      getTime = '0' + currentMinutes;
    }
    return getHour + ':' + getTime;
  }

  /*
    Get patients and keys value using ForkJoin (Multipe API call parallel)
  */
  getValues() {
    const params = { "nopaging": 1 };
    forkJoin([
      this.apis.sendGetRequest('patient', params).subscribe((result) => {
        if (result?.count > 0) this.patient_list = result.rows;
        else {
          this.patient_list = [
            { id: 0, patient_id: 'No data found', shared_user_id: '' },
          ];
          this.status_patient = 'No data found';
          this.select_status = true;
        }
      }),
      this.apis.sendGetRequest('keys', params).subscribe((result_keys) => {
        if (result_keys?.count > 0) this.enc_key = result_keys.rows;
        else {
          this.enc_key = [{ key_id: '', key_alias: 'No data found' }];
          this.status_msg = 'No data found';
          this.select_status = true;
        }
      }),
    ]);
  }

  /*
    Hide patient id field if organization selected
  */
  changeStatus(event: any) {
    if (event.value == 'patient') {
      this.encryptionKeyForm.addControl('patient_id', new FormControl('', [Validators.required]));
    } else {
      this.encryptionKeyForm.removeControl('patient_id');
    }
  }

  /*
    function for convert date time to timestamp format
  */
  formatDate(inputDate: any, inputTime: any) {
    return new Promise((resolve) => {
      const date = moment(inputDate + ' ' + inputTime).format();
      let newDate = new Date(date).getTime().toString();
      resolve(newDate);
    });
  }

  /*
    submit form fields
  */
  saveForm() {
    this.emitForm.emit(this.encryptionKeyForm);
  }

  /*
    get form errors
  */
  get formControls() {
    return this.encryptionKeyForm.controls;
  }

}
