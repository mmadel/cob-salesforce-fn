import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PotentialRoutingModule } from './potential-routing.module';
import {
ListPotentialDoctorComponent
}from './index'

const POTENTIAL_COMPONENT=[
  ListPotentialDoctorComponent
]
@NgModule({
  declarations: [POTENTIAL_COMPONENT],
  imports: [
    CommonModule,
    PotentialRoutingModule
  ]
})
export class PotentialModule { }
