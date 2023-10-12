import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { SalesForceShareModule } from '../share/sales-force-share.module';
import {
FirstTimeTargetComponent
} from './index'

@NgModule({
  declarations: [
    FirstTimeTargetComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SalesForceShareModule,
  ]
})
export class AdministrationModule { }
