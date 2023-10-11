import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TargetRoutingModule } from './target-routing.module';
import {
  VisitedDoctorComponent,
  FirstVisitDoctorComponent
} from './index'
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableModule, UtilitiesModule } from '@coreui/angular-pro';
import { SalesForceShareModule } from '../share/sales-force-share.module';
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
    TableModule,
    UtilitiesModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class TargetModule { }
