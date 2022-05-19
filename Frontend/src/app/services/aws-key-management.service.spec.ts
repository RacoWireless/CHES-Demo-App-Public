import { TestBed } from '@angular/core/testing';

import { AwsKeyManagementService } from './aws-key-management.service';

describe('AwsKeyManagementService', () => {
  let service: AwsKeyManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsKeyManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
