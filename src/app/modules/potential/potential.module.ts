import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatePickerModule, ModalModule, SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SalesForceShareModule } from '../share/sales-force-share.module';
import {
  ListPotentialDoctorComponent,
  FollowupCreationComponent,
  FirstVisitCreateComponent
} from './index';
import { PotentialRoutingModule } from './potential-routing.module';

const POTENTIAL_COMPONENT = [
  ListPotentialDoctorComponent,
  FollowupCreationComponent,
  FirstVisitCreateComponent
]
@NgModule({
  declarations: [POTENTIAL_COMPONENT],
  imports: [
    CommonModule,
    PotentialRoutingModule,
    SalesForceShareModule,
    SmartTableModule,
    SmartPaginationModule,
    ModalModule,
    DatePickerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
})
export class PotentialModule { }
