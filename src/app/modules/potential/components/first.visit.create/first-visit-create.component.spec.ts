import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstVisitCreateComponent } from './first-visit-create.component';

describe('FirstVisitCreateComponent', () => {
  let component: FirstVisitCreateComponent;
  let fixture: ComponentFixture<FirstVisitCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstVisitCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstVisitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
