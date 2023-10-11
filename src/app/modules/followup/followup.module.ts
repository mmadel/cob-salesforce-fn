import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowupRoutingModule } from './followup-routing.module';
import { SalesForceShareModule } from '../share/sales-force-share.module';

import  {
  ConfigureFollowupComponent,
  ListFollowupComponent
} from './index'

const FOLLOWUP_COMPONENT=[
  ConfigureFollowupComponent,
  ListFollowupComponent
]
@NgModule({
  declarations: [FOLLOWUP_COMPONENT
  ],
  imports: [
    CommonModule,
    FollowupRoutingModule,
    SalesForceShareModule
  ],
})
export class FollowupModule { }
