import { Component, Input } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable, pipe } from 'rxjs';

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  
  // customers!: any[];

  // representatives!: any[];

  // statuses!: any[];

  // loading: boolean = true;

  // activityValues: number[] = [0, 100];

  // httpCallObservable = new Observable<any[]>((subscriber) => {
  //   subscriber.next([
  //     { name: 'Ga' ,country: 'Chile', company:'Ga',representative:'Ga'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //     { name: 'Bruno' ,country: 'Peru', company:'Bruno',representative:'Bruno'},
  //   ]);
  //   subscriber.complete();
  // });
  // ngOnInit() {
  //   this.httpCallObservable.subscribe(
  //     pipe((data) => {
  //       this.customers = data;
  //       this.loading = false;

  //       this.customers.forEach(
  //         (customer) => (customer.date = new Date(<Date>customer.date))
  //       );
  //     })
  //   );
  // }

  // clear(table: Table) {
  //   table.clear();
  // }


}
