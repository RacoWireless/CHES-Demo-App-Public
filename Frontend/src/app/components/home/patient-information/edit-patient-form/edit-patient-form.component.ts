import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-edit-patient-form',
  templateUrl: './edit-patient-form.component.html',
  styleUrls: ['./edit-patient-form.component.scss'],
})
export class EditPatientFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditPatientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    private apiService: ApiServicesService
  ) {
    this.form = fb.group({
      id: [''],
      patient_id: ['', Validators.required],
      shared_user_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      id: this.data?.id,
      patient_id: this.data?.patient_id,
      shared_user_id: this.data?.shared_user_id,
    });
  }

  /**
   * Edits patient, API call to edit patient details
   */
  editPatient() {
    this.apiService
      .sendPutRequest('patient', this.form.getRawValue())
      .subscribe(
        // when edited successfully
        (success) => {
          this.dialogRef.close({
            status: "Success",
            message: 'Patient details updated successfully!',
            action: 'Done',
          });
        },
        // when edit fails
        (error) => {
          this.dialogRef.close({
            status: "Failed",
            message: "Failed to update patient's details!",
            action: 'Done',
          });
        }
      );
  }
}
