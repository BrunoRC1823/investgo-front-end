import { Injectable, inject } from '@angular/core';
import { InvestmentUser } from '../interfaces/investmentUser.interface';
import { ListResponse, Opportunity, PaginatorRequest } from '../interfaces';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvestmentUserService {
  private readonly baseUrl = environments.baseUrl;
  private http = inject(HttpClient);

  getInvestmentsUser(
    code: string,
    paginator?: PaginatorRequest
  ): Observable<ListResponse<InvestmentUser>> {
    let url;
    if (paginator) {
      const { pagina, elementosPagina, ordenadoPor, enOrden } = paginator;
      url = `${this.baseUrl}/api/v1/inversiones/listar-oportunidad/${code}?pagina=${pagina}&elementosPagina=${elementosPagina}&ordenadoPor=${ordenadoPor}&enOrden=${enOrden}`;
    } else {
      url = `${this.baseUrl}/api/v1/inversiones/listar-oportunidad/${code}`;
    }
    return this.http.get<ListResponse<InvestmentUser>>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
