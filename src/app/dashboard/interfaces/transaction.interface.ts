import { BankAccount,TransactionType } from '.';

export interface Transaction {
  codigo: string;
  monto: number;
  cuentaBancaria: BankAccount;
  tipoTransaccion: TransactionType;
}
