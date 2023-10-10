import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultAdminLayoutComponent, DefaultLayoutComponent } from './core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
     
    ]
  },
  {
    path: 'admin',
    component: DefaultAdminLayoutComponent,
   
   
    children: [
   
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
