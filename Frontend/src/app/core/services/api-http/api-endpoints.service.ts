import { Injectable } from '@angular/core';
import { UrlBuilder } from 'src/app/shared/classes/url-builder';
import { QueryStringParameters } from 'src/app/shared/classes/query-string-parameters';
import { ApiConstants } from 'src/app/config/api-constants';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

/**
 * ApiEndpointsService returns the api endpoints urls to use in services in a consistent way.
 * acts as a generic service class for all the http calls.
 * @author  Midhun Krishna KV
 * @since   2021-08-06
 */
export class ApiEndpointsService {
  constructor(private constants: ApiConstants) {}
  private baseUrl = `${environment.api_url}`;

  /**
   * This method executed to generate url with the provided api endpoint.
   * @param api_endpoint This param contains endpoint for the api call.
   * @return url This method returns a complete url.
   */
  public createUrl(api_endpoint: string, isMockAPI: boolean = false): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this.constants.API_MOCK_ENDPOINT : this.baseUrl,
      api_endpoint
    );
    return urlBuilder.toString();
  }

  /**
   * This method executed to generate url with the provided api endpoint and query parameters.
   * @param api_endpoint This param contains endpoint for the api call.
   * @param queryStringHandler This param is a callback function.
   * @param pathVariable This param contains dynamic variables.
   * @param depVariable This param contains a boolean that checks if a
   * dynamic variable is a dependency or not.
   * @return url string This method returns a complete url.
   */
  public createUrlWithQueryParameters(
    api_endpoint: string,
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void,
    pathVariable?: number,
    depVariable?: boolean
  ): string {
    let encodedPathVariablesUrl: string = '';
    if (pathVariable) {
      if (depVariable) {
        api_endpoint = api_endpoint?.replace(
          '${path_variable}',
          `${pathVariable?.toString()}`
        );
      } else {
        encodedPathVariablesUrl = `/${encodeURIComponent(
          pathVariable.toString()
        )}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.baseUrl,
      `${api_endpoint}${encodedPathVariablesUrl}`
    );
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }
}
