import { Component } from '@angular/core';
import { pipe, Observable } from 'rxjs';

@Component({
  selector: 'dashboard-investments-page',
  templateUrl: './investments-page.component.html',
  styleUrls: ['./investments-page.component.css'],
})
export class InvestmentsPageComponent {
  public customers!: any[];
  public loading: boolean = true;
  public headers = ['Codigo', 'Fecha', 'Transacción', 'Monto']
  ngOnInit(): void {
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
  httpCallObservable = new Observable<any[]>((subscriber) => {
    subscriber.next([
      { codigo: 'Ga' ,fecha: 'Chile',transaccion:'Ga',monto:'Ga'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
      { codigo: 'Bruno' ,fecha: 'Peru',transaccion:'Bruno',monto:'Bruno'},
    ]);
    subscriber.complete();
  });
}
