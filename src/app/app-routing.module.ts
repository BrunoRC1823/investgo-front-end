import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  isAuthenticatedGuard,
  isNotAuthenticatedGuard,
  urlStorageGuard,
} from './guards';
import { NotFoundPageComponent } from './dashboard/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () =>
      import('./auth/modules/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    canActivateChild: [urlStorageGuard],
    loadChildren: () =>
      import('./dashboard/modules/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'page-404',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: 'page-404',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
