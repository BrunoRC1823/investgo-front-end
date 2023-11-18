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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BillsModule,
    CompaniesModule,
    HomeModule,
    InvestmentsModule,
    MovementsModule,
    OpportunitiesModule,
  ],
  exports: [BillsModule, CompaniesModule],
})
export class PagesModule {}
