import { Component, OnInit, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var $: any;
@Injectable()
export class commonclass {
    constructor(private ngxService: NgxUiLoaderService, private toastr: ToastrService, private _snackBar: MatSnackBar) { }
    /**
     * function to show notification
     * @param msg msg to show in notification
     */
    showNotification(msg: string) {
        this._snackBar.open(msg, 'Close', { duration: 3000 });
    }
    /**
   * function to show success notification
   * @param msg msg to show in notification
   */
    showSuccess(msg = "success") {
        this.toastr.success(msg);
    }
    /**
   * function to show error notification
   * @param msg msg to show in notification
   */
    showError(msg = "error") {
        this.toastr.error(msg);
    }
    /**
   * function to show loader
   * @param status status of loader
   */
    public showLoader(status = 'stop') {
        if (status == 'start') {
            this.ngxService.start();
        } else {
            this.ngxService.stop();
        }

    }
}