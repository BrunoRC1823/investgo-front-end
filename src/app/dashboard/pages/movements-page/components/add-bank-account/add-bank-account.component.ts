import { Component, OnInit, inject } from '@angular/core';
import { BankAccount } from 'src/app/dashboard/interfaces';
import { BankAccountService } from '../../../../services/bank-account.service';
import { Severity } from 'src/app/shared/enums/severity-toast.enum';
import { MyMessageService } from 'src/app/shared/services/my-message-service.service';

@Component({
  selector: 'movements-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.css'],
})
export class AddBankAccountComponent implements OnInit {
  private bankAccountService = inject(BankAccountService);
  private myMessageService = inject(MyMessageService);

  public displayTrashContainer = false;
  public displayAnimationTrashContainer = false;
  public banksAccounts: (BankAccount | null)[] = [];

  public draggedAccount: BankAccount | null | undefined;

  public visible: boolean = false;

  ngOnInit(): void {
    this.listBanksAccounts();
  }

  toggleDialog() {
    this.visible = !this.visible;
  }

  dropAccount(draggedAccount: BankAccount) {
    this.draggedAccount = draggedAccount;
  }

  toggleDisplayTrashContainer(): void {
    let interval = this.displayTrashContainer ? 500 : 0;
    this.displayAnimationTrashContainer = !this.displayAnimationTrashContainer;
    setTimeout(() => {
      this.displayTrashContainer = !this.displayTrashContainer;
    }, interval);
  }

  listBanksAccounts() {
    this.bankAccountService.listCardsAccounts().subscribe((accounts) => {
      const { content } = accounts;
      this.banksAccounts = content;
    });
  }

  deleteBankAccount() {
    const { codigo } = this.draggedAccount as BankAccount;
    if (codigo) {
      this.bankAccountService.delete(codigo).subscribe({
        next: ({ mensaje }) => {
          this.myMessageService.toastBuilder(
            Severity.success,
            'Eliminación exitosa',
            mensaje
          );
          this.listBanksAccounts();
          this.displayTrashContainer = false;
        },
        error: ({ error }) => {
          this.myMessageService.toastBuilder(
            Severity.error,
            'Eliminación errónea',
            error.mensaje
          );
        },
      });
    }
    this.visible = false;
  }
}
