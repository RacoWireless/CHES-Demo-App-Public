import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-assigned-key-modal',
  templateUrl: './assigned-key-modal.component.html',
  styleUrls: ['./assigned-key-modal.component.scss']
})
export class AssignedKeyModalComponent implements OnInit {
  public assignedList : any;
  public patientList :any= []
  public orgList :any= []
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.assignedList = data;
   }

  ngOnInit(): void {
    this.patientList = this.assignedList.filter((a:any) => a.patient_id != null);
    this.orgList = this.assignedList.filter((a:any) => a.organization_name != null)
  }

}
