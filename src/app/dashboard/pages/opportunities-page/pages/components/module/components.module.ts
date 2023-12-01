import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { TableOpportunitiesPageComponent } from '../table-opportunities-page/table-opportunities-page.component';

@NgModule({
  declarations: [TableOpportunitiesPageComponent],
  imports: [CommonModule, PrimeNgModule],
  exports: [TableOpportunitiesPageComponent],
})
export class ComponentsModule {}
