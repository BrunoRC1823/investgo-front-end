import { Component, computed, inject } from '@angular/core';
import { pipe, Observable } from 'rxjs';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'dashboard-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.css']
})
export class CompaniesPageComponent {
  private userService: UserService = inject(UserService);

  public activeIndexTab = 0;
  public balance = computed(() => this.userService.currentBalance());
  public customers!: any[];
  public loading: boolean = true;
  public headers = ['Codigo', 'Fecha', 'Transacción', 'Monto'];

  ngOnInit(): void {
    this.setTabIndex();
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
  onTabChange(event: any): void {
    localStorage.setItem('tabIndexCompanies', event.index);
  }
  setTabIndex() {
    const tabIndexMovements = localStorage.getItem('tabIndexCompanies');
    if (!tabIndexMovements) return;
    this.activeIndexTab = parseInt(tabIndexMovements);
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