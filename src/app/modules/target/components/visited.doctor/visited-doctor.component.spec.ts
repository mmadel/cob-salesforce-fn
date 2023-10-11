import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitedDoctorComponent } from './visited-doctor.component';

describe('VisitedDoctorComponent', () => {
  let component: VisitedDoctorComponent;
  let fixture: ComponentFixture<VisitedDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitedDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitedDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
