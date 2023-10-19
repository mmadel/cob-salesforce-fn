import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { SalesForceShareModule } from '../share/sales-force-share.module';
import {
  FirstTimeTargetComponent,
  CreateClinicComponent,
  ListClinicComponent,
  CreateUserComponent,
  ListUserComponent,
  FollowupConfigurationComponent
} from './index'
import { NgxSpinnerModule } from 'ngx-spinner';
import { MultiSelectModule, TableModule } from '@coreui/angular-pro';


@NgModule({
  declarations: [
    FirstTimeTargetComponent,
    CreateClinicComponent,
    ListClinicComponent,
    CreateUserComponent,
    ListUserComponent,
    FollowupConfigurationComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SalesForceShareModule,
    TableModule,
    MultiSelectModule,
    TableModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class AdministrationModule { }
