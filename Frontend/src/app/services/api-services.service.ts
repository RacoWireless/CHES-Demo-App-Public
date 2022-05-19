import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ApiServicesService {
  public authStatusListener = new Subject<boolean>();
  //base url for api endpoint
  public base = environment.api_url;
  public pull_model_url = environment.pull_model_url;
  isAuthenticated: boolean = false;
  public token: string = '';
  private tokenTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  getIsAuth() {
    let token = localStorage.getItem('accessToken');
    if (token != '' && token != undefined && token != null)
      this.isAuthenticated = true;
    return this.isAuthenticated;
  }
  getToken() {
    if (this.token != '' && this.token != null && this.token != undefined) {
      return this.token;
    } else {
      this.isAuthenticated = false;
      this.logout();
    }
    return;
  }
  saveLocalItems(token: string, expiry: string, email: string) {
    this.token = token;
    localStorage.setItem('accessToken', token);
    localStorage.setItem('email', email);
    localStorage.setItem('expiry', expiry);
  }
  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    localStorage.removeItem('expiry');
    this.router.navigate(['/login']);
  }
  //send post request
  sendPostRequest(api: string, data: any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
    let options = {
      headers: httpHeaders,
    };
    return this.httpClient.post(this.getUrl(api), data, options);
  }
  //send get request
  sendGetRequest(api: string, params?: any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
    let options = {
      headers: httpHeaders,
      params: params
    };
    return this.httpClient.get(this.getUrl(api), options)
  }
  //merge  base url and api
  getUrl(api_name: string) {
    return this.base + api_name;
  }
  //fetch local data
  private getAuthData() {
    const token = localStorage.getItem('accessToken');
    const expiration = localStorage.getItem('expiry');
    if (!token || !expiration) {
      return false;
    }
    return {
      token: token,
      expirationDate: parseInt(expiration),
    };
  }
  //automatic user auth
  public autoAuthUser() {
    const authData = this.getAuthData();
    if (!authData) {
      this.logout();
      return;
    }
    const now = new Date();
    const current_date = now.getTime() / 1000;
    const expiresIn = authData.expirationDate - Math.round(current_date);
    if (expiresIn > 0) {
      this.token = authData.token;
      this.isAuthenticated = true;
      // this.setAuthDuration(expiresIn);
      // this.authStatusListener.next(true);
    } else {
      this.logout();
    }
  }
  setAuthDuration(time: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, time);
  }

  //send put request
  sendPutRequest(api: string, data: any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
    let options = {
      headers: httpHeaders,
    };
    return this.httpClient.put(this.getUrl(api), data, options);
  }

  //send delete request
  sendDeleteRequest(api: string, body: any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
    let options = {
      headers: httpHeaders,
      body: body,
    };
    return this.httpClient.delete(this.getUrl(api), options);
  }
   //request for subscription
   sendPullModelRequest(api: string, data: any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': environment.pull_model_token
    });
    let options = {
      headers: httpHeaders,
    };
    return this.httpClient.post(api, data, options);
  }
     //request for subscription details
     getPullModelConfig(api: string): Observable<any> {
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': environment.pull_model_token
      });
      let options = {
        headers: httpHeaders,
      };
      return this.httpClient.get(api, options);
    }
}
