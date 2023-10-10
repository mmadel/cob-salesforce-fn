import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPotentialDoctorComponent } from './components/list-potential-doctor.component';

const routes: Routes = [{
  path:'',
  data: {
    title: 'Potential',
  },
  children:[
    {
      path:'list',
      component: ListPotentialDoctorComponent,
      data: {
        title: 'List',
      },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PotentialRoutingModule { }
