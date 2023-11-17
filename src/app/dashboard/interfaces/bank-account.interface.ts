import { Bank, Currency } from '.';

export interface BankAccount {
  codigo?: string;
  nroCuenta?: string;
  nroCuentaCci: string;
  cvv: string;
  mes: string;
  year: string;
  saldo: number;
  banco: Bank;
  moneda: Currency;
}
