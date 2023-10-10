import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';

const routes: Routes = [
  {
    path:'',
    data: {
      title: '',
    },
    children:[
      {
        path:'',
        component: DashboardComponent,
        data: {
          title: '',
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
