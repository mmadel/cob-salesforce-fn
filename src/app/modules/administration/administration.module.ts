import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { SalesForceShareModule } from '../share/sales-force-share.module';
import {
FirstTimeTargetComponent,
CreateClinicComponent,
ListClinicComponent
} from './index'
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    FirstTimeTargetComponent,
    CreateClinicComponent,
    ListClinicComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SalesForceShareModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class AdministrationModule { }
