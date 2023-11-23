import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBankAccountPageComponent } from '../page/list-bank-account-page/list-bank-account-page.component';
import { FormAddBankAccountPageComponent } from '../page/form-add-bank-account-page/form-add-bank-account-page.component';
import { FormAddTransactionPageComponent } from '../page/form-add-transaction-page/form-add-transaction-page.component';

const routes: Routes = [
  { path: '', component: ListBankAccountPageComponent },
  { path: 'add-account', component: FormAddBankAccountPageComponent },
  { path: 'add-transaction', component: FormAddTransactionPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovementsRoutingModule {}
