import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsPageComponent } from '../layouts/bills-page.component';
import { BillsRoutingModule } from './bills-routing.module';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BillsPageComponent],
  imports: [CommonModule, BillsRoutingModule, PrimeNgModule,SharedModule ,ReactiveFormsModule] ,
  exports: [BillsPageComponent],
})
export class BillsModule {}
