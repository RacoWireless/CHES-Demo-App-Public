import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors,FormGroup, FormControl, Validators ,ValidatorFn } from '@angular/forms';
import { commonclass } from '../../../../common/common';
import { ApiServicesService } from '../../../../services/api-services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {

  disabled : boolean = false
  subcriptionForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,this.passwordValidator()]),
    topic_name: new FormControl('',[Validators.required]),
    consumergroup: new FormControl(''),
  });
  constructor(private apis : ApiServicesService , private msgs : commonclass) { }

  ngOnInit(): void {
    this.getSubscriptionDetails();
  }
  /**
   * Get subscription form details
   */
  getSubscriptionDetails(){
    this.apis
    .getPullModelConfig(
      environment.pull_model_url,
    )
    .subscribe((result) => {
      this.subcriptionForm.patchValue({
        username : result?.username,
        password : result?.password,
        topic_name : result?.topic_name,
        consumergroup: result?.consumergroup
      });
    });
  }
  /**
   * save subscription form
   */
  saveForm(){
    let payload = {
      username : this.subcriptionForm.value.username,
      password : this.subcriptionForm.value.password,
      topic_name : this.subcriptionForm.value.topic_name,
      consumergroup: this.subcriptionForm.value.consumergroup
    }
    this.apis
    .sendPullModelRequest(
      environment.pull_model_url,
      payload
    )
    .subscribe((result) => {
      this.subcriptionForm.patchValue({
        username :  this.subcriptionForm.value.username,
        password :  this.subcriptionForm.value.password,
        topic_name :  this.subcriptionForm.value.topic_name,
        consumergroup: this.subcriptionForm.value.consumergroup
      });
      this.msgs.showNotification(result.message)
    });
  }
  /**
   * Get form errors
   */
  get formControls() {
      return this.subcriptionForm.controls;
  }
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      //Pattern for password
      const pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*#?&])[A-Za-z\d-@$!%*#?&]{8,}$/;
      const isValid = pwdPattern.test(value);
      return !isValid ? { password: 'invalid' } : null;
    };
  }
}
