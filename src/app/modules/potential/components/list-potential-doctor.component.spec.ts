import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPotentialDoctorComponent } from './list-potential-doctor.component';

describe('ListPotentialDoctorComponent', () => {
  let component: ListPotentialDoctorComponent;
  let fixture: ComponentFixture<ListPotentialDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPotentialDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPotentialDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
