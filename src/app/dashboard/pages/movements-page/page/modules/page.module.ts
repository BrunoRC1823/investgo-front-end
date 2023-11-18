import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAddBankAccountPageComponent } from '../form-add-bank-account-page/form-add-bank-account-page.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/modules/components.module';
import { ListBankAccountPageComponent } from '../list-bank-account-page/list-bank-account-page.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  declarations: [FormAddBankAccountPageComponent, ListBankAccountPageComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class PageModule {}
