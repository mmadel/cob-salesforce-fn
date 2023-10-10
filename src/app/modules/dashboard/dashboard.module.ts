import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import {
  DashboardComponent
} from './index'

const DASHBOARD_COMPONENT = [
  DashboardComponent
]

@NgModule({
  declarations: [DASHBOARD_COMPONENT],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
