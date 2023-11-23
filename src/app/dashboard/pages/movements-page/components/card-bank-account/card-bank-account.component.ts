import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BankAccount } from 'src/app/dashboard/interfaces';

@Component({
  selector: 'movements-card-bank-account',
  templateUrl: './card-bank-account.component.html',
  styleUrls: ['./card-bank-account.component.css'],
})
export class CardBankAccountComponent {
  @Input() bankAccount: BankAccount | undefined;
  @Input() banksAccounts: (BankAccount | null)[] = [];

  @Output() draggedAccountEmit = new EventEmitter<BankAccount>();

  public draggedAccount: BankAccount | null | undefined;

  dragEnd() {
    this.draggedAccount = null;
  }

  dragStart(account: BankAccount | null) {
    if (account === null) return;
    this.draggedAccount = account;
    this.draggedAccountEmit.emit(this.draggedAccount);
  }
}
