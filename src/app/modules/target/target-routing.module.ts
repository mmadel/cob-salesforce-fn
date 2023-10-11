import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstVisitDoctorComponent } from './components/first.visit.doctor/first-visit-doctor.component';
import { VisitedDoctorComponent } from './components/visited.doctor/visited-doctor.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Completed Tasks',
  },
  children: [
    {
      path: 'visited',
      component: VisitedDoctorComponent,
      data: {
        title: 'Visited-Doctors',
      },
    },
    {
      path: 'first',
      component: FirstVisitDoctorComponent,
      data: {
        title: 'First-Visit-Doctors',
      },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetRoutingModule { }
