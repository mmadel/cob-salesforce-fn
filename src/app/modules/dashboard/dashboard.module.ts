import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import {
  DashboardComponent
} from './index'
import { SalesForceShareModule } from '../share/sales-force-share.module';
import { WidgetModule } from '@coreui/angular-pro';

const DASHBOARD_COMPONENT = [
  DashboardComponent
]

@NgModule({
  declarations: [DASHBOARD_COMPONENT],
  imports: [
    CommonModule,
    SalesForceShareModule,
    WidgetModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
