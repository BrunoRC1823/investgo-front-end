import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentsPageComponent } from '../pages/investments-page.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { InvestmentsRoutingModule } from './investments-routing.module';

@NgModule({
  declarations: [InvestmentsPageComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    SharedModule,
    InvestmentsRoutingModule,
  ],
})
export class InvestmentsModule {}
