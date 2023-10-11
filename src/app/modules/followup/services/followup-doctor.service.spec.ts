import { TestBed } from '@angular/core/testing';

import { FollowupDoctorService } from './followup-doctor.service';

describe('FollowupDoctorService', () => {
  let service: FollowupDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowupDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
