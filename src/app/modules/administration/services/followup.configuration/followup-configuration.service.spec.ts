import { TestBed } from '@angular/core/testing';

import { FollowupConfigurationService } from './followup-configuration.service';

describe('FollowupConfigurationService', () => {
  let service: FollowupConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowupConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
