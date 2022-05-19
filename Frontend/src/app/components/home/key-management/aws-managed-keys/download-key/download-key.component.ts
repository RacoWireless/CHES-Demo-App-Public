import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-download-key',
  templateUrl: './download-key.component.html',
  styleUrls: ['./download-key.component.scss'],
})

/**
 * DownloadKeyComponent writes the key file data to a pem file and downloads the fiel after.
 * @author  Midhun Krishna KV
 * @since   2021-08-06
 */
export class DownloadKeyComponent implements OnInit {
  fileType: string;
  blobUrl: any;
  sanitizedBlobUrl: any;
  filename: string;

  constructor(
    private dialogRef: MatDialogRef<DownloadKeyComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data: any,
    private sanitizer: DomSanitizer
  ) {
    this.sanitizedBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data.blobUrl);
    this.blobUrl = data.blobUrl;
    this.fileType = data.fileType;
    const currentDate = new Date();
    this.filename = `${this.fileType}_${currentDate.toISOString()}.pem`;
  }
  ngOnInit(): void {}

  /**
   * Function to close the dialog.
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * Function to download the key file and close the dialog.
   */
  download() {
    this.dialogRef.close();
  }

  viewInBrowser() {
    //window.open(this.blobUrl);
  }
}
