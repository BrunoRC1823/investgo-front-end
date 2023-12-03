import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { TableOpportunitiesPageComponent } from '../table-opportunities-page/table-opportunities-page.component';
import { BooleansTablePipe } from 'src/pipes/booleansTable.pipe';
import { SetAttributeRowTablePipe } from 'src/pipes/setAttributeRowTable.pipe';
import { PercentagePipe } from 'src/pipes/percentagePipe.pipe';
import { TableAddOpportunityComponent } from '../table-add-opportunity/table-add-opportunity.component';

@NgModule({
  declarations: [TableOpportunitiesPageComponent, TableAddOpportunityComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    SetAttributeRowTablePipe,
    BooleansTablePipe,
    PercentagePipe,
  ],
  exports: [TableOpportunitiesPageComponent, TableAddOpportunityComponent],
})
export class ComponentsModule {}
