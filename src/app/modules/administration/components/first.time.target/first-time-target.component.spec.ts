import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeTargetComponent } from './first-time-target.component';

describe('FirstTimeTargetComponent', () => {
  let component: FirstTimeTargetComponent;
  let fixture: ComponentFixture<FirstTimeTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstTimeTargetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstTimeTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
