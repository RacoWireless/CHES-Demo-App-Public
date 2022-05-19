/*
 * Copyright © KORE Wireless. All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

/**
 * ApiHttpService service class is a generic class for all the http methods like get,post,put etc..
 * acts as a generic class for all the http methods to make an http requests.
 * @author  Midhun Krishna KV
 * @since   2021-07-30
 */
export class ApiHttpService {
  constructor(private http: HttpClient) {}

  /**
   * Executes generic Http get method
   * @param url This param contains url.
   * @param options This param contains optional parameters.
   * @return Observable This method returns an observable.
   */
  public get = (url: string, options?: any): Observable<any> =>
    this.http.get(url, options);

  /**
   * Executes generic Http post method
   */
  public post = (url: string, data: any, options?: any): Observable<any> =>
    this.http.post(url, data, options);

  /**
   * Executes generic Http put method
   */
  public put = (url: string, data: any, options?: any): Observable<any> =>
    this.http.put(url, data, options);

  /**
   * Executes generic Http delete method
   */
  public delete = (url: string, options?: any): Observable<any> =>
    this.http.delete(url, options);
}
