import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { pipe, Observable } from 'rxjs';
import { EnableValue } from 'src/app/auth/enums/enable-value.enum';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TransactionTypeEnum } from 'src/app/dashboard/enums/transaction-type.enum';
import {
  Transaction,
  PaginatorRequest,
  ListResponse,
} from 'src/app/dashboard/interfaces';
import { InvestmentService } from 'src/app/dashboard/services/investment.service';
import { TableHelpersService } from 'src/app/dashboard/services/tableHelpers.service';
import { TransactionService } from 'src/app/dashboard/services/transaction.service';
import { UserService } from 'src/app/dashboard/services/user.service';
import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';

@Component({
  selector: 'movements-list-bank-account-page',
  templateUrl: './list-bank-account-page.component.html',
  styleUrls: ['./list-bank-account-page.component.css'],
})
export class ListBankAccountPageComponent {
  private userService: UserService = inject(UserService);
  private authService = inject(AuthService);
  private transactionService = inject(TransactionService);
  private tableHelpers = inject(TableHelpersService);
  
  public username = this.authService.getUsername();

  public activeIndexTab = 0;
  public balance = computed(() => this.userService.currentBalance());
  public tableNoData: boolean = true;
  public configTable: TableConfig = {
    totalElements: 0,
    data: [],
    loading: true,
    columns: [
      { head: 'Codigo', name: 'codigo', value: '' },
      { head: 'Fecha', name: 'auditoria', value: 'fecha' },
      { head: 'Hora', name: 'hora', value: '' },
      {
        head: 'Transacción',
        name: 'tipoTransaccion',
        value: 'nombre',
        highligh: 'true',
      },
      { head: 'Cuenta destino', name: 'cuentaBancaria', value: 'codigo' },
      { head: 'Monto', name: 'monto', value: '' },
    ],
    rows: 5,
  };


  ngOnInit(): void {
    this.getTransactions();
    this.setTabIndex();
  }

  getTransactions($event?: any) {
    let paginator: any;
    if ($event) {
      paginator = new PaginatorRequest();
      paginator = this.tableHelpers.assignPaginatorValues($event, paginator);
    }
    this.transactionService
      .getTransactions(paginator)
      .subscribe((transactions) => {
        if (transactions.content.length > 0) {
          this.assignTransactionValue(transactions);
        } else {
          this.resetData();
        }
      });
  }

  resetData() {
    this.configTable.data = [];
    this.configTable.percentageList = [];
    this.tableNoData = true;
    this.configTable.percentageList = [];
  }

  assignTransactionValue(transactions: ListResponse<Transaction>) {
    const { content, totalElements } = transactions;
    content.forEach((transaction: Transaction) => {
      let { fecha } = transaction!.auditoria;
      const fechaFormant = new DatePipe('es-PE').transform(fecha, 'dd/MM/yyyy');
      const hora = new DatePipe('es-PE').transform(fecha, 'HH:mm a');
      transaction!.hora = hora!;
      transaction!.auditoria.fecha = fechaFormant!;
    });
    this.tableNoData = false;
    this.configTable.loading = false;
    this.configTable.data = content;
    this.configTable.totalElements = totalElements;
  }

  onTabChange(event: any): void {
    localStorage.setItem('tabIndexMovements', event.index);
  }

  setTabIndex() {
    const tabIndexMovements = localStorage.getItem('tabIndexMovements');
    if (!tabIndexMovements) return;
    this.activeIndexTab = parseInt(tabIndexMovements);
  }
}
