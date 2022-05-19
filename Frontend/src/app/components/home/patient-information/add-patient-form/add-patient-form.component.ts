import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-add-patient-form',
  templateUrl: './add-patient-form.component.html',
  styleUrls: ['./add-patient-form.component.scss'],
})
export class AddPatientFormComponent implements OnInit {
  @Output() status = new EventEmitter();

  form: FormGroup;

  constructor(fb: FormBuilder, private apiServices: ApiServicesService) {
    this.form = fb.group({
      patient_id: ['', Validators.required],
      shared_user_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  /**
   * Adds patient, API call to add patient
   */
  addPatient() {
    this.apiServices
      .sendPostRequest('patient', this.form.getRawValue())
      .subscribe(
        (success) => {
          this.emitStatus('Patient added successfully!', 'Done');
          this.form.reset();
        },
        (error) => {
          this.emitStatus('Failed to add patient!', 'Done');
        }
      );
  }

  /**
   * Emits response status
   * @param message 
   * @param action 
   */
  emitStatus(message: string, action: string) {
    this.status.emit({ message: message, action: action });
  }
}
