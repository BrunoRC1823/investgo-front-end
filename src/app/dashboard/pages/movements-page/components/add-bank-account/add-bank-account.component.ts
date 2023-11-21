import { Component, OnInit, inject } from '@angular/core';
import { BankAccount } from 'src/app/dashboard/interfaces';
import { BankAccountService } from '../../../../services/bank-account.service';

@Component({
  selector: 'movements-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.css'],
})
export class AddBankAccountComponent implements OnInit {
  private bankAccountService = inject(BankAccountService);

  public banksAccounts: (BankAccount | null)[] = [];

  ngOnInit(): void {
    this.listBanksAccounts();
  }

  listBanksAccounts() {
    this.bankAccountService.listCardsAccounts().subscribe((accounts) => {
      const { content } = accounts;
      this.banksAccounts = content;
    });
  }
}
