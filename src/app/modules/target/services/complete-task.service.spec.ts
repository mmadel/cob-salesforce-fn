import { TestBed } from '@angular/core/testing';

import { CompleteTaskService } from './complete-task.service';

describe('CompleteTaskService', () => {
  let service: CompleteTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
