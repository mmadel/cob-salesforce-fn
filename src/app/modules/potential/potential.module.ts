import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule, ModalModule, SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SalesForceShareModule } from '../share/sales-force-share.module';
import {
  ListPotentialDoctorComponent,
  FollowupCreationComponent
} from './index';
import { PotentialRoutingModule } from './potential-routing.module';

const POTENTIAL_COMPONENT = [
  ListPotentialDoctorComponent,
  FollowupCreationComponent
]
@NgModule({
  declarations: [POTENTIAL_COMPONENT, FollowupCreationComponent],
  imports: [
    CommonModule,
    PotentialRoutingModule,
    SalesForceShareModule,
    SmartTableModule,
    SmartPaginationModule,
    ModalModule,
    DatePickerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class PotentialModule { }
