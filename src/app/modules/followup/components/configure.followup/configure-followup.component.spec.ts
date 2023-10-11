import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureFollowupComponent } from './configure-followup.component';

describe('ConfigureFollowupComponent', () => {
  let component: ConfigureFollowupComponent;
  let fixture: ComponentFixture<ConfigureFollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureFollowupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
