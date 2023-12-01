import { Component, OnInit, computed, inject } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import {
  ListResponse,
  PaginatorRequest,
  Transaction,
} from '../../../interfaces';
import { TransactionTypeEnum } from '../../../enums/transaction-type.enum';
import { UserService } from '../../../services/user.service';
import { TransactionService } from 'src/app/dashboard/services/transaction.service';
import { DatePipe } from '@angular/common';
import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';
import { EnableValue } from 'src/app/auth/enums/enable-value.enum';
import { InvestmentService } from 'src/app/dashboard/services/investment.service';
import { TableHelpersService } from 'src/app/dashboard/services/tableHelpers.service';
import { Table } from 'primeng/table';

const monthNames: String[] = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
@Component({
  selector: 'dashboard-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private transactionService = inject(TransactionService);
  private investmentService = inject(InvestmentService);
  private tableHelpers = inject(TableHelpersService);

  public currentMonth?: String;
  public currentYear?: Number;
  public withdrawalCounts: Number = 0;
  public depositsCounts: Number = 0;
  public investmentsCount: number = 0;
  public balance = computed(() => this.userService.currentBalance());
  public totalDeposits: number = 0;
  public totalInvestments: number = 0;
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
      { head: 'Monto', name: 'monto', value: '' },
    ],
    rows: 5,
  };

  public username = this.authService.getUsername();

  ngOnInit(): void {
    this.getDate();
    this.getInvestments(EnableValue.enable);
    this.getInvestments(EnableValue.notEnable);
    this.getTransactionsByType(TransactionTypeEnum.deposit);
    this.getTransactionsByType(TransactionTypeEnum.withdrawal);
    this.getTransactions();
  }

  getDate() {
    const currentDate = new Date();
    const monthIndex = currentDate.getMonth();
    this.currentMonth = monthNames[monthIndex];
    this.currentYear = currentDate.getFullYear();
  }

  getInvestments(enable: EnableValue) {
    this.investmentService
      .getInvestmentsByCurrentUser(enable)
      .subscribe((investment) => {
        const { content } = investment;
        const count = content.length;
        this.investmentsCount += count;
        content.forEach((investment) => {
          const { montoInvertido } = investment;
          this.totalInvestments += montoInvertido;
        });
      });
  }

  getTransactionsByType(type: TransactionTypeEnum) {
    this.transactionService
      .getTransactionsByType(type)
      .subscribe((transactions) => {
        const { content } = transactions;
        this.setTransactionsCounts(content, type);
      });
  }

  setTransactionsCounts(
    content: (Transaction | null)[],
    type: TransactionTypeEnum
  ) {
    if (content === null) return;

    const count = content.length;
    if (count > 0) this.tableNoData = false;
    if (type === TransactionTypeEnum.deposit) {
      this.depositsCounts = count;
      content.forEach(
        (transaction) => (this.totalDeposits += transaction!.monto)
      );
    } else {
      this.withdrawalCounts = count;
    }
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
    this.configTable.loading = false;
    this.configTable.data = content;
    this.configTable.totalElements = totalElements;
  }
}
