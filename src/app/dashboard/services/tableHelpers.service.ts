import { Injectable } from '@angular/core';
import { PaginatorRequest } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TableHelpersService {

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
    } else if ($event.sortOrder === -1) {
      paginator.enOrden = 'DESC';
    }
    paginator.elementosPagina = $event?.rows!;
    return paginator;
  }

}
