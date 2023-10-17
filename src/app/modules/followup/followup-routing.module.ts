import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFollowupComponent } from './components/followup.list/list-followup.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Follow Up',
  },
  children:[
    {
      path: 'list',
      component: ListFollowupComponent,
      data: {
        title: 'List-Followup-Doctors',
      },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowupRoutingModule { }
