import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultAdminLayoutComponent, DefaultLayoutComponent } from './core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'administrator/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'administrator',
    component: DefaultAdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'potential',
        loadChildren: () =>
          import('./modules/potential/potential.module').then((m) => m.PotentialModule)
      },
      {
        path: 'target',
        loadChildren: () =>
          import('./modules/target/target-routing.module').then((m) => m.TargetRoutingModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
