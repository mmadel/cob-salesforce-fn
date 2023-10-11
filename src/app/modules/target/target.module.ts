import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetRoutingModule } from './target-routing.module';
import {
  VisitedDoctorComponent,
  FirstVisitDoctorComponent
} from './index'
import { SalesForceShareModule } from '../share/sales-force-share.module';
import { NgxSpinnerModule } from 'ngx-spinner';
const TARGET_COMPONENT = [
  VisitedDoctorComponent,
  FirstVisitDoctorComponent
]
@NgModule({
  declarations: [
    TARGET_COMPONENT
  ],
  imports: [
    CommonModule,
    TargetRoutingModule,
    SalesForceShareModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class TargetModule { }
