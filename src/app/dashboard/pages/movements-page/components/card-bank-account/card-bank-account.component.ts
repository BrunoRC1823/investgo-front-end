import { Component, Input } from '@angular/core';
import { BankAccount } from 'src/app/dashboard/interfaces';

@Component({
  selector: 'movements-card-bank-account',
  templateUrl: './card-bank-account.component.html',
  styleUrls: ['./card-bank-account.component.css'],
})
export class CardBankAccountComponent {
  @Input() bankAccount: BankAccount | null = {
    nroCuenta: 'PE00-0000-0000-00-0000000000',
    nroCuentaCci: '000-000-000000000000-00',
    cvv: '000',
    mes: 'MM',
    year: 'YY',
    saldo: 1000,
    banco: {
      nombre: 'BBVA',
    },
    moneda: {
      nombre: 'Nuevo Sol',
      valor: 'PEN',
    },
  };
}
