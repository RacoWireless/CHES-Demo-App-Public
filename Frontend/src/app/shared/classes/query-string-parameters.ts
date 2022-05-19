import { QueryParams } from 'src/app/models/shared.model';

/**
 * QueryStringParameters class is a generic helper class to process and combine
 * all the query params together.
 * acts as a generic helper class for combining all the query params.
 * @author  Midhun Krishna KV
 * @since   2021-07-30
 */
export class QueryStringParameters {
  private paramsAndValues: string[];

  constructor() {
    this.paramsAndValues = [];
  }

  /**
   * This method processes all the query params cpmpairing with the original query params and merges into one.
   * @param queryStrings This param contains new or modified query strings.
   * @param CONFIG_PARAMS This param contains original query strings.
   * @return Object This method returns an object literal query param key values.
   */
  public static processQueryParams(
    queryStrings: QueryParams,
    CONFIG_PARAMS?: any
  ) {
    let queryParams = {};
    if (typeof queryStrings !== 'undefined') {
      if (CONFIG_PARAMS?.length) {
        queryParams = { ...CONFIG_PARAMS[0], ...queryStrings };
      } else {
        queryParams = queryStrings;
      }
      return queryParams;
    } else if (CONFIG_PARAMS?.length) {
      return CONFIG_PARAMS[0];
    } else return null;
  }

  public static helperFunction(CONFIG_PARAMS: any[]) {
    let keys: string[] = [];
    CONFIG_PARAMS?.forEach((el) => {
      keys = Object.keys(el);
    });
    return keys;
  }

  public push(querParams: any): void {
    try {
      for (const key in querParams) {
        this.paramsAndValues.push([key, querParams[key]].join('='));
      }
    } catch (error) {
      console.error(error);
    }
  }

  public toString = (): string => this.paramsAndValues.join('&');
}
