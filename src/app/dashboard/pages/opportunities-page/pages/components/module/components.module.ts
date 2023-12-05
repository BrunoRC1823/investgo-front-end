import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { TableOpportunitiesPageComponent } from '../table-opportunities-page/table-opportunities-page.component';
import { BooleansTablePipe } from 'src/pipes/booleansTable.pipe';
import { SetAttributeRowTablePipe } from 'src/pipes/setAttributeRowTable.pipe';
import { PercentagePipe } from 'src/pipes/percentagePipe.pipe';
import { TableAddOpportunityComponent } from '../table-add-opportunity/table-add-opportunity.component';
import { CardOpportunityInvestmentComponent } from '../card-opportunity-investment/card-opportunity-investment.component';
import { CustomCurrencyPipe } from 'src/pipes/customCurrency.pipe';
import { ReduceTitlePipe } from 'src/pipes/ReduceTitle.pipe';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TableOpportunitiesPageComponent,
    TableAddOpportunityComponent,
    CardOpportunityInvestmentComponent,
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    SetAttributeRowTablePipe,
    BooleansTablePipe,
    PercentagePipe,
    CustomCurrencyPipe,
    ReduceTitlePipe,
    PercentagePipe,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    TableOpportunitiesPageComponent,
    TableAddOpportunityComponent,
    CardOpportunityInvestmentComponent,
    SideBarComponent,
  ],
})
export class ComponentsModule {}
