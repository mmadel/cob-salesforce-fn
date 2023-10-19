import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultAdminLayoutComponent, DefaultLayoutComponent } from './core';
import { KCAuthGuard } from './modules/security/service/kc/kcauth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'administrator/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'administrator',
    component: DefaultAdminLayoutComponent,
    canActivate: [KCAuthGuard],
    data: {
      title: '',
      roles: ['administration','sales']
    },
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
        path: 'followup',
        loadChildren: () =>
          import('./modules/followup/followup.module').then((m) => m.FollowupModule)
      },
      {
        path: 'target',
        loadChildren: () =>
          import('./modules/target/target.module').then((m) => m.TargetModule)
      },
      {
        path: 'administration',
        loadChildren: () =>
          import('./modules/administration/administration.module').then((m) => m.AdministrationModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
