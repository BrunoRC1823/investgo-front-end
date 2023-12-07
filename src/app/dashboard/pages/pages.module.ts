import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BillsModule } from './bills-page/modules/bills.module';
import { CompaniesModule } from './companies-page/modules/companies.module';
import { HomeModule } from './home-page/modules/home.module';
import { InvestmentsModule } from './investments-page/modules/investments.module';
import { MovementsModule } from './movements-page/modules/movements.module';
import { OpportunitiesModule } from './opportunities-page/modules/opportunities.module';
import { UserAccountModule } from './account-user-page/module/account-user.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
@NgModule({
  imports: [
    BillsModule,
    CommonModule,
    CompaniesModule,
    HomeModule,
    HttpClientModule,
    InvestmentsModule,
    MovementsModule,
    OpportunitiesModule,
    ReactiveFormsModule,
    UserAccountModule,
    PrimeNgModule,
  ],
  exports: [NotFoundPageComponent],
  declarations: [
    NotFoundPageComponent
  ],
})
export class PagesModule {}
