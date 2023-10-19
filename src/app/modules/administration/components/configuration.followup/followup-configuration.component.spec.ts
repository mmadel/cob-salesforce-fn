import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupConfigurationComponent } from './followup-configuration.component';

describe('FollowupConfigurationComponent', () => {
  let component: FollowupConfigurationComponent;
  let fixture: ComponentFixture<FollowupConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowupConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowupConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
