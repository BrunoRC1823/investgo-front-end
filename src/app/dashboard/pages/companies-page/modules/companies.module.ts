import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesPageComponent } from '../pages/companies-page/companies-page.component';
import { PageModule } from '../pages/modules/page.module';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CompaniesRoutingModule } from './companiess-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PageModule,
    PrimeNgModule,
    SharedModule,
    CompaniesRoutingModule,
  ],
  exports: [PageModule],
})
export class CompaniesModule {}
