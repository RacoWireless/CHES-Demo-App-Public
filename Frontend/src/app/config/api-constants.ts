import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiConstants {
  public readonly API_MOCK_ENDPOINT: string = ''; // path to 'assets/*.json' for mock api response

  public static readonly API_ENDPOINT_CONSTANTS = {
    KEY_MANAGEMENT: {
      get_aws_keys_api: 'keys',
      get_public_key_api: 'publickeys',
      create_public_key_api: 'keys',
    },
  };
}
