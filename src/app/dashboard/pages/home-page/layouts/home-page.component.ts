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

  public currentMonth?: String;
  public currentYear?: Number;
  public withdrawal: Number = 0;
  public deposit: Number = 0;
  public investmentsCount: number = 0;
  public balance = computed(() => this.userService.currentBalance());
  public totalDeposits: number = 0;
  public configTable: TableConfig = {
    totalElements: 0,
    data: [],
    loading: true,
    columns: [
      { head: 'Codigo', name: 'codigo', value: '' },
      { head: 'Fecha', name: 'auditoria', value: 'fecha' },
      { head: 'Hora', name: 'hora', value: '' },
      { head: 'Transacción', name: 'tipoTransaccion', value: 'nombre' },
      { head: 'Monto', name: 'monto', value: '' },
    ],
  };

  public username = this.authService.getUsername();

  ngOnInit(): void {
    this.getDate();
    this.getTransactionsByType(TransactionTypeEnum.deposit);
    this.getTransactionsByType(TransactionTypeEnum.withdrawal);
  }

  getDate() {
    const currentDate = new Date();
    const monthIndex = currentDate.getMonth();
    this.currentMonth = monthNames[monthIndex];
    this.currentYear = currentDate.getFullYear();
  }

  setTransactionsCounts(
    content: (Transaction | null)[],
    type: TransactionTypeEnum
  ) {
    if (content === null) return;
    const count = content.length;
    if (type == TransactionTypeEnum.deposit) {
      this.deposit = count;
    } else {
      this.withdrawal = count;
    }
  }

  getTransactionsByType(type: TransactionTypeEnum) {
    this.transactionService
      .getTransactionsByType(type)
      .subscribe((transactions) => {
        const { content } = transactions;
        this.setTransactionsCounts(content, type);
      });
  }

  getTransactions($event?: any) {
    let paginator: PaginatorRequest = new PaginatorRequest();
    if ($event) {
      this.assignPaginatorValues($event, paginator);
    }
    setTimeout(() => {
      this.transactionService
        .getTransactions(paginator)
        .subscribe((transactions) => {
          this.assignTransactionValue(transactions);
        });
    }, 300);
  }
  assignPaginatorValues($event: any, paginator: PaginatorRequest) {
    if ($event.page) {
      paginator.pagina = $event?.page!;
    }
    if ($event.sortField) {
      paginator.ordenadoPor = $event.sortField;
    }
    if (paginator.ordenadoPor === 'hora') {
      paginator.ordenadoPor = 'auditoria.fecha';
    }
    if ($event.sortOrder === 1) {
      paginator.enOrden = 'ASC';
    } else if ($event.sortOrder === -1){
      paginator.enOrden = 'DESC';
    }
    paginator.elementosPagina = $event?.rows!;
    return paginator;
  }

  assignTransactionValue(transactions: ListResponse<Transaction>) {
    const { content, totalElements } = transactions;
    content.forEach((transaction: Transaction) => {
      let { fecha } = transaction!.auditoria;
      const fechaFormant = new DatePipe('es-PE').transform(fecha, 'dd/MM/yyyy');
      const hora = new DatePipe('es-PE').transform(fecha, 'HH:mm a');
      transaction!.hora = hora!;
      transaction!.auditoria.fecha = fechaFormant!;
      if(transaction.tipoTransaccion.id === 1){
        this.totalDeposits += transaction.monto;
      }
    });
    this.configTable.loading = false;
    this.configTable.data = content;
    this.configTable.totalElements = totalElements;
  }
}
