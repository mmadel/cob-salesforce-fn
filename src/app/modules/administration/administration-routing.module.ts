import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
