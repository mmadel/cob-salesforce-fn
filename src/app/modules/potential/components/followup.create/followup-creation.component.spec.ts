import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupCreationComponent } from './followup-creation.component';

describe('FollowupCreationComponent', () => {
  let component: FollowupCreationComponent;
  let fixture: ComponentFixture<FollowupCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowupCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowupCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
