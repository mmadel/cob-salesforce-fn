import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClinicComponent } from './components/clinic/create/create-clinic.component';
import { ListClinicComponent } from './components/clinic/list/list-clinic.component';
import { FirstTimeTargetComponent } from './components/first.time.target/first-time-target.component';
import { CreateUserComponent } from './components/user/create/create-user.component';
import { ListUserComponent } from './components/user/list/list-user.component';

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
        title: 'Clinic List',
      }
    },
    {
      path:'create/clinic',
      component: CreateClinicComponent,
      data: {
        title: 'Create Clinic',
      }
    },
    {
      path:'create/user',
      component: CreateUserComponent,
      data: {
        title: 'Create Clinic',
      }
    },
    {
      path:'list/user',
      component: ListUserComponent,
      data: {
        title: 'User List',
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
