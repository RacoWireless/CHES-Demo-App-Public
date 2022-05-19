import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../config/api-constants';
import { AWSKeyManagementConfig } from '../config/app.config';
import { ApiEndpointsService } from '../core/services/api-http/api-endpoints.service';
import { ApiHttpService } from '../core/services/api-http/api-http.service';
import { QueryStringParameters } from '../shared/classes/query-string-parameters';

@Injectable({
  providedIn: 'root',
})
export class AwsKeyManagementService {
  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService
  ) {}

  /**
   * Function to fetch all the keys from the server.
   */
  getAwsKeys(queryStrings?: any): Observable<any> {
    return this.apiHttpService.get(
      this.apiEndpointsService.createUrlWithQueryParameters(
        ApiConstants.API_ENDPOINT_CONSTANTS.KEY_MANAGEMENT.get_aws_keys_api,
        (params: QueryStringParameters) => {
          params.push(
            QueryStringParameters.processQueryParams(
              queryStrings,
              AWSKeyManagementConfig.getKeyParams
            )
          );
        }
      )
    );
  }

  /**
   * Function to get the public key data to be downloaded to the system..
   */
  getPublicKeyForDownload(queryStrings?: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    return this.apiHttpService.get(
      this.apiEndpointsService.createUrlWithQueryParameters(
        ApiConstants.API_ENDPOINT_CONSTANTS.KEY_MANAGEMENT.get_public_key_api,
        (params: QueryStringParameters) => {
          params.push(
            QueryStringParameters.processQueryParams(queryStrings, [])
          );
        }
      ),
      { headers, responseType: 'text' }
    );
  }

  /**
   * Function to create or generate a new key file.
   */
  createPublicKey(alias: string, description: string): Observable<any> {
    let body = {
      key_spec: 'RSA_2048',
      description: description ?? '',
      key_usage: 'ENCRYPT_DECRYPT',
      alias: alias,
    };
    return this.apiHttpService.post(
      this.apiEndpointsService.createUrlWithQueryParameters(
        ApiConstants.API_ENDPOINT_CONSTANTS.KEY_MANAGEMENT
          .create_public_key_api,
        (params: QueryStringParameters) => {
          params.push(QueryStringParameters.processQueryParams({}, []));
        }
      ),
      body
    );
  }
}
