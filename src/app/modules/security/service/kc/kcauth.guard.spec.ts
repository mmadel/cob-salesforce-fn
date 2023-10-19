import { TestBed } from '@angular/core/testing';

import { KCAuthGuard } from './kcauth.guard';

describe('KCAuthGuard', () => {
  let guard: KCAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KCAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
