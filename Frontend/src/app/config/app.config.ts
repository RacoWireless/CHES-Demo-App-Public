/*
 * @Author: mamal@korewireless.com
 * @Date: 2021-08-03 13:57:35
 * @Last Modified by: mamal@korewireless.com
 * @desc [Configuration file that contains global constants,  settings for the ches demo cloud application.]
 */
import { environment } from '../../environments/environment';
export class GlobalConfig {
  public static EncryptionKey: string = environment.telemetry_endpoint;
  public static OrganisiationId: number = 1;
  /*
    Universal date time format
  */
  public static readonly TIMESTANDARD: Object[] = [
    { value: '0', viewValue: '(UTC) Coordinated Universal Time' },
  ];
}

export class AWSKeyManagementConfig {
  public static itemsPerPage: number = 15;
  public static getKeyParams: any[] = [
    {
      limit: '10',
      offset: '0',
      sort_by: 'key_id',
      globalSearch: '',
      sort_order: 'asc',
      search_by: 'any',
      search_value: '',
    },
  ];
}
