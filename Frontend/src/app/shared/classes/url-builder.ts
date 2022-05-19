import { QueryStringParameters } from './query-string-parameters';

/**
 * UrlBuilder class patche sthe base url,endpoints and query strings together.
 * acts as a generic url builder class for all the http calls.
 * @author  Midhun Krishna KV
 * @since   2021-07-30
 */
export class UrlBuilder {
  public url: string;
  public queryString: QueryStringParameters;
  constructor(
    private baseUrl: string,
    private api_endpoint: string,
    queryString?: QueryStringParameters
  ) {
    this.url = [baseUrl, api_endpoint].join('');
    this.queryString = queryString || new QueryStringParameters();
  }

  /**
   * This method appends the query strings to the url.
   * @return url This method returns a complete url with query params.
   */
  public toString(): string {
    const qs: string = this.queryString ? this.queryString.toString() : '';
    return qs ? `${this.url}?${qs}` : this.url;
  }
}
