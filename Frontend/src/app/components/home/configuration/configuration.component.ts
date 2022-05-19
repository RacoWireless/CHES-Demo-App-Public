import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { commonclass } from '../../../common/common';
import { ApiServicesService } from '../../../services/api-services.service';
import { EncryptionKeys, PatientLists } from '../../../models/model';
import { GlobalConfig } from '../../../config/app.config';
import * as moment from 'moment';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  public encryption_key: string = GlobalConfig.EncryptionKey;

  constructor(private loader: commonclass, private apis: ApiServicesService) {}

  ngOnInit(): void {
    this.loader.showLoader('start');
    this.loader.showLoader('stop');
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
  async saveForm(form: FormGroup) {
    let timeStamp = await this.formatDate(
      form.value.enc_date,
      form.value.enc_time
    );
    let data_sent = {};
    if (form.value.key_type == 'organization') {
      data_sent = {
        organization_id: GlobalConfig.OrganisiationId,
        key_id: form.value.key_file,
        effective_date: timeStamp,
      };
    } else if (form.value.key_type == 'patient') {
      data_sent = {
        patient_id: form.value.patient_id,
        key_id: form.value.key_file,
        effective_date: timeStamp,
      };
    } else {
      this.loader.showNotification('Something went wrong..!');
    }
    this.apis
      .sendPostRequest(
        'cofigurations?reqType=' + form.value.key_type,
        data_sent
      )
      .subscribe((result) => {
        form.controls["key_file"].reset();
        form.controls["key_type"].reset();
        form.value.key_type == 'patient' ?? form.controls["patient_id"].reset();
        form.controls["enc_timezone"].reset();
        form.removeControl('patient_id');
        this.loader.showNotification('Successfully created');
      });
  }
}
