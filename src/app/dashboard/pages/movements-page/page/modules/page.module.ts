import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/modules/components.module';
import { FormAddBankAccountPageComponent } from '../form-add-bank-account-page/form-add-bank-account-page.component';
import { FormAddTransactionPageComponent } from '../form-add-transaction-page/form-add-transaction-page.component';
import { ListBankAccountPageComponent } from '../list-bank-account-page/list-bank-account-page.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  declarations: [
    FormAddBankAccountPageComponent,
    FormAddTransactionPageComponent,
    ListBankAccountPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    PrimeNgModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class PageModule {}
