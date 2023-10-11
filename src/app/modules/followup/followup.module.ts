import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowupRoutingModule } from './followup-routing.module';
import { SalesForceShareModule } from '../share/sales-force-share.module';

import  {
  ConfigureFollowupComponent,
  ListFollowupComponent
} from './index'
import { SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    SalesForceShareModule,
    SmartTableModule,
    SmartPaginationModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
})
export class FollowupModule { }
