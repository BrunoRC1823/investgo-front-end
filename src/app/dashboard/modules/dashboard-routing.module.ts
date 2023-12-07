import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../layouts/dashboard.component';
import { NotFoundPageComponent } from '../pages/not-found-page/not-found-page.component';
import { hasRoleGuard } from 'src/app/guards/hasRole.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../pages/home-page/modules/home.module').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: 'opportunities',
        loadChildren: () =>
          import(
            '../pages/opportunities-page/modules/opportunities.module'
          ).then((m) => m.OpportunitiesModule),
      },
      {
        path: 'investments',
        loadChildren: () =>
          import('../pages/investments-page/modules/investments.module').then(
            (m) => m.InvestmentsModule
          ),
      },
      {
        path: 'movements',
        loadChildren: () =>
          import('../pages/movements-page/modules/movements.module').then(
            (m) => m.MovementsModule
          ),
      },
      {
        canMatch: [hasRoleGuard],
        path: 'companies',
        loadChildren: () =>
          import('../pages/companies-page/modules/companies.module').then(
            (m) => m.CompaniesModule
          ),
      },
      {
        canMatch: [hasRoleGuard],
        path: 'bills',
        loadChildren: () =>
          import('../pages/bills-page/modules/bills.module').then(
            (m) => m.BillsModule
          ),
      },
      {
        path: 'account-user',
        loadChildren: () =>
          import('../pages/account-user-page/module/account-user.module').then(
            (m) => m.UserAccountModule
          ),
      },
      {
        path: '**',
        redirectTo: '/page-404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
