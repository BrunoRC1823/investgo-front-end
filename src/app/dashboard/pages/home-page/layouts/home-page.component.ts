import { Component, OnInit, computed, inject } from '@angular/core';
import { Observable, pipe } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Transaction } from '../../../interfaces';
import { TransactionTypeEnum } from '../../../enums/transaction-type.enum';
import { UserService } from '../../../services/user.service';

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

  public currentMonth?: String;
  public currentYear?: Number;
  public withdrawal: Number = 0;
  public deposit: Number = 0;
  public transactionsCount: number = 0;
  public balance = computed(() => this.userService.currentBalance());
  public customers!: any[];
  public loading: boolean = true;
  public headers = ['Codigo', 'Fecha', 'Transacción', 'Monto'];
  public username = this.authService.getUsername();

  ngOnInit(): void {
    this.getDate();
    this.getTransactions(TransactionTypeEnum.deposit);
    this.getTransactions(TransactionTypeEnum.withdrawal);
    this.httpCallObservable.subscribe(
      pipe((data) => {
        this.customers = data;
        this.loading = false;

        this.customers.forEach(
          (customer) => (customer.date = new Date(<Date>customer.date))
        );
      })
    );
  }

  getDate() {
    const currentDate = new Date();
    const monthIndex = currentDate.getMonth();
    this.currentMonth = monthNames[monthIndex];
    this.currentYear = currentDate.getFullYear();
  }

  getTransactions(type: TransactionTypeEnum) {
    this.userService.getTransactions(type).subscribe((transactions) => {
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
    if (type == TransactionTypeEnum.deposit) {
      this.deposit = count;
    } else {
      this.withdrawal = count;
    }
    this.transactionsCount += count;
  }

  httpCallObservable = new Observable<any[]>((subscriber) => {
    subscriber.next([
      { codigo: 'Ga', fecha: 'Chile', transaccion: 'Ga', monto: 'Ga' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
      { codigo: 'Bruno', fecha: 'Peru', transaccion: 'Bruno', monto: 'Bruno' },
    ]);
    subscriber.complete();
  });
}
