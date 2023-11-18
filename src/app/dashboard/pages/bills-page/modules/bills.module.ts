import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsPageComponent } from '../layouts/bills-page.component';
import { BillsRoutingModule } from './bills-routing.module';

@NgModule({
  declarations: [BillsPageComponent],
  imports: [CommonModule, BillsRoutingModule],
  exports: [BillsPageComponent],
})
export class BillsModule {}
