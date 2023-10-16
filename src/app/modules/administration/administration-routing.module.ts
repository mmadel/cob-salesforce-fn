import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClinicComponent } from './components/clinic/create/create-clinic.component';
import { ListClinicComponent } from './components/clinic/list/list-clinic.component';
import { FirstTimeTargetComponent } from './components/first.time.target/first-time-target.component';

const routes: Routes = [{
  path:'',
  data: {
    title: 'Administration',
  },
  children:[
    {
      path:'configure',
      component: FirstTimeTargetComponent,
      data: {
        title: 'First-Time-Configuration',
      },
    },{
      path:'list/clinic',
      component: ListClinicComponent,
      data: {
        title: 'List Clinic',
      }
    },
    {
      path:'create/clinic',
      component: CreateClinicComponent,
      data: {
        title: 'Create Clinic',
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
