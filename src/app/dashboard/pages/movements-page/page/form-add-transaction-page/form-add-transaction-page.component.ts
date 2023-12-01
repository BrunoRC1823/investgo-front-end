import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

import { Table } from 'primeng/table';

import { BankAccount, TransactionType } from 'src/app/dashboard/interfaces';
import { BankAccountService } from 'src/app/dashboard/services/bank-account.service';
import { TransactionService } from 'src/app/dashboard/services/transaction.service';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { MyMessageService } from 'src/app/shared/services/my-message-service.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';

const deposit = {
  id: 1,
  nombre: 'Deposito',
};
const withdrawal = {
  id: 2,
  nombre: 'Retiro',
};
@Component({
  selector: 'app-form-add-transaction-page',
  templateUrl: './form-add-transaction-page.component.html',
  styleUrls: ['./form-add-transaction-page.component.css'],
})
export class FormAddTransactionPageComponent implements OnInit {
  private bankAccountService = inject(BankAccountService);
  private transactionService = inject(TransactionService);
  private myMessageService = inject(MyMessageService);
  private validatorsService = inject(ValidatorService);

  private router = inject(Router);

  private fb = inject(FormBuilder);
  public myForm: FormGroup = this.fb.group({
    tipoTransaccion: [null, [Validators.required]],
    monto: [null, [Validators.required]],
    cuentaBancaria: [null, [Validators.required]],
    nroCuenta: [null, [Validators.required]],
  });

  public typeTransaction: TransactionType[] | undefined;
  public filteredTypeTransaction: TransactionType[] = [];

  public banksAccounts: (BankAccount | null)[] = [];
  public selectedAccount: BankAccount | undefined;
  public disableButton: boolean = true;

  ngOnInit(): void {
    const currentUrl = this.router.url;
    let tipoTransaccionCtrl = this.myForm.get('tipoTransaccion');
    if (currentUrl.includes('deposit')) {
      tipoTransaccionCtrl!.setValue(deposit);
    } else {
      tipoTransaccionCtrl!.setValue(withdrawal);
    }
    this.myForm.get('nroCuenta')?.disable();
    this.listBanksAccounts();
    this.getTypeTransactions();
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  filterTypeTransaction(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.typeTransaction as any[]).length; i++) {
      let bank = (this.typeTransaction as any[])[i];
      if (bank.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(bank);
      }
    }
    this.filteredTypeTransaction = filtered;
  }

  getTypeTransactions() {
    this.transactionService.getTypeTransactions().subscribe((list) => {
      this.typeTransaction = list;
    });
  }

  listBanksAccounts() {
    this.bankAccountService.listCardsAccounts().subscribe((accounts) => {
      const { content } = accounts;
      this.banksAccounts = content;
    });
  }

  handleFilter(event: any, table: Table) {
    let value = event;
    if (!(typeof event === 'string')) {
      value = event.target.value.toLowerCase();
    }
    this.disableButton = false;
    table.filterGlobal(value, 'contains');
  }

  onSelect($event: BankAccount, table: Table) {
    const { codigo, nroCuenta } = $event;
    this.handleFilter(codigo, table);
    const ctaCtrl = this.myForm.get('cuentaBancaria');
    ctaCtrl!.patchValue({ codigo });
    const nroCuentaCtrl = this.myForm.get('nroCuenta');
    nroCuentaCtrl?.setValue(nroCuenta);
  }

  clear(table: Table) {
    table.clear();
    this.disableButton = true;
    this.myForm.get('nroCuenta')?.reset();
  }

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const transaction = this.myForm.value;
    console.log(transaction);
    this.transactionService.register(transaction).subscribe({
      next: ({ mensaje }) => {
        this.myMessageService.toastBuilder(
          Severity.success,
          'Registro exitoso',
          mensaje
        );
        this.myForm.reset;
        this.router.navigateByUrl('/dashboard/movements');
      },
      error: ({ error }) => {
        if (error.mensaje) {
          error.mensaje.forEach((mensaje: string) => {
            this.myMessageService.toastBuilder(
              Severity.error,
              'Error',
              mensaje
            );
          });
          return;
        }
        this.myMessageService.toastBuilder(
          Severity.warn,
          'Formulario inválido',
          'Fallaron las validaciones!'
        );
      },
    });
  }

  clearForm() {
    this.myForm.reset();
    const tipoCtrl = this.myForm.controls['tipoTransaccion'];
    tipoCtrl.markAsPristine();
  }
}
