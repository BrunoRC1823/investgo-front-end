import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillsComponent } from './pages/bills-page/bills-page.component';
import { CompaniesPageComponent } from './pages/companies-page/companies-page.component';
import { DashboardComponent } from './dashboard.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { InvestmentsPageComponent } from './pages/investments-page/investments-page.component';
import { MovementsPageComponent } from './pages/movements-page/movements-page.component';
import { OpportunitiesUserPageComponent } from './pages/opportunities-user-page/opportunities-user-page.component';
import { OpportunitiesAdminPageComponent } from './pages/opportunities-admin-page/opportunities-admin-page.component';
import { FormAddBankAccountPageComponent } from './pages/movements-page/page/form-add-bank-account-page/form-add-bank-account-page.component';
import { urlStorageGuard } from '../guards';

const routes: Routes = [
  {
    path: '',
    
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomePageComponent,},
      { path: 'opportunities', component: OpportunitiesUserPageComponent, },
      { path: 'investments', component: InvestmentsPageComponent },
      { path: 'movements', component: MovementsPageComponent },
      {
        path: 'movements/add-account',
        component: FormAddBankAccountPageComponent,
      },
      { path: 'companies', component: CompaniesPageComponent },
      { path: 'bills', component: BillsComponent },
      {
        path: 'opportunities-admin',
        component: OpportunitiesAdminPageComponent,
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
