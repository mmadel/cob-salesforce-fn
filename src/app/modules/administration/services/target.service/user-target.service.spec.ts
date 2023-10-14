import { TestBed } from '@angular/core/testing';

import { UserTargetService } from './user-target.service';

describe('UserTargetService', () => {
  let service: UserTargetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTargetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
