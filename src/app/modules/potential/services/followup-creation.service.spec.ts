import { TestBed } from '@angular/core/testing';

import { FollowupCreationService } from './followup-creation.service';

describe('FollowupCreationService', () => {
  let service: FollowupCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowupCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
