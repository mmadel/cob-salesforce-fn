import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowupRoutingModule } from './followup-routing.module';
import { SalesForceShareModule } from '../share/sales-force-share.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FollowupRoutingModule,
    SalesForceShareModule
  ],
})
export class FollowupModule { }
