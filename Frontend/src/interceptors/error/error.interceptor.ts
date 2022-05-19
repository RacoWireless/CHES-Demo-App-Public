import { Injectable } from '@angular/core';
import { ApiServicesService } from '../../app/services/api-services.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { commonclass } from '../../app/common/common';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private msgs: commonclass,private apis:ApiServicesService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const __error = error.error;
        let errorMessage = 'An Unknown Error Occured';
        if (__error) {
          errorMessage = __error.error ?? JSON.parse(__error).error;
        }
        if (errorMessage != undefined && errorMessage != null) {
          this.msgs.showNotification(
            errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
          );
          if(__error.tokenExpired != undefined && __error.tokenExpired != null){
            setTimeout(() => {
                this.apis.logout();
            }, 1000);
          }
        }
        return throwError(error);
      })
    );
  }
}
