import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstVisitDoctorComponent } from './first-visit-doctor.component';

describe('FirstVisitDoctorComponent', () => {
  let component: FirstVisitDoctorComponent;
  let fixture: ComponentFixture<FirstVisitDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstVisitDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstVisitDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
