import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultAdminLayoutComponent, DefaultLayoutComponent } from './core';

const routes: Routes = [
  {
    path: 'administrator',
    component: DefaultAdminLayoutComponent,
    children: [
      {
        path: 'potential',
        loadChildren: () =>
          import('./modules/potential/potential.module').then((m) => m.PotentialModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
