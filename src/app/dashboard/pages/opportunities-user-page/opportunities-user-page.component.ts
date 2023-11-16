import { Component } from '@angular/core';
import { pipe, Observable } from 'rxjs';

@Component({
  selector: 'dashboard-opportunities-user-page',
  templateUrl: './opportunities-user-page.component.html',
  styleUrls: ['./opportunities-user-page.component.css'],
})
export class OpportunitiesUserPageComponent {
  public style = { color: 'var(--sidebar-color)' };
  public customers!: any[];
  public loading: boolean = true;
  public headers = ['Nombre', 'Pais', 'Empresa', 'Representante'];
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
      { nombre: 'Ga', pais: 'Chile', empresa: 'Ga', representante: 'Ga' },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
      {
        nombre: 'Bruno',
        pais: 'Peru',
        empresa: 'Bruno',
        representante: 'Bruno',
      },
    ]);
    subscriber.complete();
  });
}
