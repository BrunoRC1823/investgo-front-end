import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MyMessageService } from 'src/app/shared/services/my-message-service.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { BankAccountService } from '../../../../services/bank-account.service';
import { Bank, BankAccount, Currency } from 'src/app/dashboard/interfaces';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';

@Component({
  selector: 'movements-form-add-bank-account-page',
  templateUrl: './form-add-bank-account-page.component.html',
  styleUrls: ['./form-add-bank-account-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAddBankAccountPageComponent implements OnInit {
  private router = inject(Router);

  private myMessageService = inject(MyMessageService);
  private bankAccountService = inject(BankAccountService);
  private validatorsService = inject(ValidatorService);

  public banks: Bank[] = [];
  public currencies: Currency[] = [];

  public minYear: Date = new Date();
  public maxYear: Date = new Date();
  public minMonth: Date = new Date();
  public maxMonth: Date = new Date();

  private fb = inject(FormBuilder);
  public myForm: FormGroup = this.fb.group({
    banco: [{banco: null}, [Validators.required]],
    cvv: [null, [Validators.required]],
    mes: [null, [Validators.required]],
    moneda: [{moneda: null}, [Validators.required]],
    nroCuenta: [null, [Validators.required]],
    nroCuentaCci: [null, [Validators.required]],
    year: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.listBanks();
    this.listCurrency();
    const today = new Date();
    this.minYear = new Date(today.getFullYear(), today.getMonth(), 1);
    this.maxYear = new Date(2039, 11, 31);
    this.minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonthOfYear = new Date(today.getFullYear(), 11, 1);
    this.maxMonth = today <= lastMonthOfYear ? lastMonthOfYear : this.minMonth;
  }
  clear() {
    this.myForm.reset();
  }
  getFormValue(): BankAccount {
    return this.myForm.value;
  }

  private formatMes(date: Date): string {
    return `${date.getMonth() + 1}`;
  }

  private formatYear(date: Date): string {
    return `${date.getFullYear()}`;
  }

  private assignDateValues() {
    const mesControl = this.myForm.get('mes');
    const yearControl = this.myForm.get('year');
    mesControl?.setValue(this.formatMes(mesControl.value));
    yearControl?.setValue(this.formatYear(yearControl.value));
  }
  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  listBanks() {
    this.bankAccountService.listBanks().subscribe({
      next: (list) => {
        this.banks = list;
      },
      error: () => {
        this.myMessageService.toastBuilder(
          Severity.warn,
          'Atención!',
          'No se pudieron cargar los bancos'
        );
      },
    });
  }
  listCurrency() {
    this.bankAccountService.listCurrency().subscribe({
      next: (list) => {
        this.currencies = list;
      },
      error: () => {
        this.myMessageService.toastBuilder(
          Severity.warn,
          'Atención!',
          'No se pudieron cargar los tipos de moneda'
        );
      },
    });
  }

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.assignDateValues();
    const account = this.myForm.value;
    this.bankAccountService.register(account).subscribe({
      next: ({ mensaje }) => {
        this.myMessageService.toastBuilder(
          Severity.success,
          'Registro exitoso',
          mensaje
        );
        this.myForm.reset;
        this.router.navigateByUrl('/dashboard/movements');
      },
      error: (error) => {
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
}
