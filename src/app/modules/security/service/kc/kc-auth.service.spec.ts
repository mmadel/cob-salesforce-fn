import { TestBed } from '@angular/core/testing';

import { KcAuthService } from './kc-auth.service';

describe('KcAuthService', () => {
  let service: KcAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KcAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
