import { TestBed } from '@angular/core/testing';

import { FollowupHistoryService } from './followup-history.service';

describe('FollowupHistoryService', () => {
  let service: FollowupHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowupHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
