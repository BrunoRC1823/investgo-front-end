import { Component, Input } from '@angular/core';
import { BankAccount } from 'src/app/dashboard/interfaces';

@Component({
  selector: 'movements-card-bank-account',
  templateUrl: './card-bank-account.component.html',
  styleUrls: ['./card-bank-account.component.css'],
})
export class CardBankAccountComponent {
  @Input() bankAccount: BankAccount | undefined;
  @Input() banksAccounts: (BankAccount | null)[] = [];
}
