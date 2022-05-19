import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-delete-patient-dialog',
  templateUrl: './delete-patient-dialog.component.html',
  styleUrls: ['./delete-patient-dialog.component.scss'],
})
export class DeletePatientDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeletePatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiServicesService
  ) {}

  ngOnInit(): void {}

  /**
   * Deletes patient, Delete API call to delete user of a specific id
   */
  deletePatient() {
    const patientData = {
      id: this.data?.id,
    };
    this.apiService.sendDeleteRequest('patient', patientData).subscribe(
      // delete is successfull
      (success) => {
        this.dialogRef.close({
          status: "Success",
          message: 'Patient deleted successfully!',
          action: 'Done',
        });
      },
      // when delete fails
      (error) => {
        this.dialogRef.close({
          status: "Failed",
          message: 'Patient was not deleted!',
          action: 'Done',
        });
      }
    );
  }
}
