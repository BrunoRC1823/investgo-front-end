import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  isAuthenticatedGuard,
  isNotAuthenticatedGuard,
  urlStorageGuard,
} from './guards';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/modules/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    canActivateChild: [urlStorageGuard],
    loadChildren: () =>
      import('./dashboard/modules/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
