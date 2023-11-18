import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../layouts/dashboard.component';

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
        path: 'companies',
        loadChildren: () =>
          import('../pages/companies-page/modules/companies.module').then(
            (m) => m.CompaniesModule
          ),
      },
      {
        path: 'bills',
        loadChildren: () =>
          import('../pages/bills-page/modules/bills.module').then(
            (m) => m.BillsModule
          ),
      },
      { path: '**', redirectTo: 'home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
