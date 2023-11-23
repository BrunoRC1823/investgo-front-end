import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, catchError, map, throwError } from 'rxjs';

import { environments } from 'src/environments/environments';
import { Investment, ListResponse, PaginatorRequest } from '../interfaces';
import { EnableValue } from 'src/app/auth/enums/enable-value.enum';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private readonly baseUrl: string = environments.baseUrl;

  private http = inject(HttpClient);

  getInvestmentsByCurrentUser(
    enable: EnableValue,
    paginator?: PaginatorRequest
  ): Observable<ListResponse<Investment>> {
    let url;
    if (paginator) {
      const { pagina, elementosPagina, ordenadoPor, enOrden } = paginator;
      url = `${this.baseUrl}/api/v1/inversiones/listar-enable/${enable}?pagina=${pagina}&elementosPagina=${elementosPagina}&ordenadoPor=${ordenadoPor}&enOrden=${enOrden}`;
    } else {
      url = `${this.baseUrl}/api/v1/inversiones/listar-enable/${enable}`;
    }
    return this.http.get<ListResponse<Investment>>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
