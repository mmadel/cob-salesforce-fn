import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowupRoutingModule } from './followup-routing.module';
import { SalesForceShareModule } from '../share/sales-force-share.module';
import { ModalModule, SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  ConfigureFollowupComponent,
  ListFollowupComponent,
  FollowupHistoryComponent,
  FollowupCreationComponent
} from './index'



const FOLLOWUP_COMPONENT = [
  ConfigureFollowupComponent,
  ListFollowupComponent,
  FollowupHistoryComponent,
  FollowupCreationComponent
]
@NgModule({
  declarations: [FOLLOWUP_COMPONENT, FollowupHistoryComponent, FollowupCreationComponent
  ],
  imports: [
    CommonModule,
    FollowupRoutingModule,
    SalesForceShareModule,
    SmartTableModule,
    SmartPaginationModule,
    ModalModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
})
export class FollowupModule { }
