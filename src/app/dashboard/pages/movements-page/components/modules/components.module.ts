import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBankAccountComponent } from '../add-bank-account/add-bank-account.component';
import { CardBankAccountComponent } from '../card-bank-account/card-bank-account.component';
import { CustomCurrencyPipe } from 'src/pipes/customCurrency.pipe';
import { LogoBankPipe } from 'src/pipes/logo-bank.pipe';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { StringToDateFormatterPipe } from 'src/pipes/string-to-date-formatter.pipe';

@NgModule({
  declarations: [
    AddBankAccountComponent,
    CardBankAccountComponent,
    LogoBankPipe,
    StringToDateFormatterPipe,
  ],
  imports: [CommonModule, PrimeNgModule, CustomCurrencyPipe],
  providers: [StringToDateFormatterPipe],
  exports: [AddBankAccountComponent, CardBankAccountComponent],
})
export class ComponentsModule {}
