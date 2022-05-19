import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { ApiServicesService } from '../../app/services/api-services.service';
import { commonclass } from '../../app/common/common';
@Injectable({
  providedIn : 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: ApiServicesService,private msgs : commonclass) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
 
    let authRequest = request;
    let authToken   = this.authService.getToken();
    if(authToken !== '' && authToken !== undefined && authToken !== null) {
       authRequest = request.clone({
        headers : request.headers.set('Authorization',authToken)
      });
    } 
    return next.handle(authRequest).pipe(
      tap<any>(evt=> {
        if (evt instanceof HttpResponse) {

          if(evt.body.status==false){
            if(evt.body.invalidToken) {
              this.authService.logout();
            }
             try{
              // this.msgs.showError(evt.body.message)
          }catch(err:any){
              this.msgs.showError(err)
          }
          }
         
        }
      })
    );
  }
}
