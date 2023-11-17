import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AddBankAccountComponent } from './pages/movements-page/components/add-bank-account/add-bank-account.component';
import { BillsComponent } from './pages/bills-page/bills-page.component';
import { CardBankAccountComponent } from './pages/movements-page/components/card-bank-account/card-bank-account.component';
import { CompaniesPageComponent } from './pages/companies-page/companies-page.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormAddBankAccountPageComponent } from './pages/movements-page/page/form-add-bank-account-page/form-add-bank-account-page.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { InvestmentsPageComponent } from './pages/investments-page/investments-page.component';
import { MovementsPageComponent } from './pages/movements-page/movements-page.component';
import { OpportunitiesAdminPageComponent } from './pages/opportunities-admin-page/opportunities-admin-page.component';
import { OpportunitiesUserPageComponent } from './pages/opportunities-user-page/opportunities-user-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StringToDateFormatterPipe } from './pipes/string-to-date-formatter.pipe';
import { LogoBankPipe } from './pipes/logo-bank.pipe';
import { CustomCurrencyPipe } from './pipes/customCurrency.pipe';
import { FormCompaniesPageComponent } from './pages/companies-page/pages/form-companies-page.component';

@NgModule({
  declarations: [
    AddBankAccountComponent,
    BillsComponent,
    CardBankAccountComponent,
    CompaniesPageComponent,
    DashboardComponent,
    FormAddBankAccountPageComponent,
    HeaderComponent,
    HomePageComponent,
    InvestmentsPageComponent,
    MovementsPageComponent,
    OpportunitiesAdminPageComponent,
    OpportunitiesUserPageComponent,
    SideBarComponent,
    StringToDateFormatterPipe,
    LogoBankPipe,
    CustomCurrencyPipe,
    FormCompaniesPageComponent,
  ],
  exports: [StringToDateFormatterPipe, CustomCurrencyPipe, LogoBankPipe],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PrimeNgModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [DatePipe],
})
export class DashboardModule {}
