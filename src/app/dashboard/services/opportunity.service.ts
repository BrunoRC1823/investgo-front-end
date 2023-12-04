import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map, catchError, throwError } from 'rxjs';

import { ConfirmResponse } from 'src/app/shared/interfaces/confirm-response.interface';
import { EnableValue } from 'src/app/auth/enums/enable-value.enum';
import { environments } from 'src/environments/environments';
import { PaginatorRequest, ListResponse, Opportunity } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class OpportunityService {
  private readonly baseUrl: string = environments.baseUrl;

  private http = inject(HttpClient);

  register(opportunity: Opportunity): Observable<ConfirmResponse> {
    const { codigo } = opportunity;
    const url = `${this.baseUrl}/api/v1/oportunidades-inversion`;
    if (codigo) {
      return this.http.put<ConfirmResponse>(url, opportunity);
    } else {
      return this.http.post<ConfirmResponse>(url, opportunity);
    }
  }

  deleteOpportunity(code: string): Observable<ConfirmResponse> {
    const url = `${this.baseUrl}/api/v1/oportunidades-inversion/${code}`;
    return this.http.delete<ConfirmResponse>(url);
  }

  addBillToList(addRequest: any): Observable<ConfirmResponse> {
    const url = `${this.baseUrl}/api/v1/add-factura`;
    return this.http.post<ConfirmResponse>(url, addRequest);
  }

  deleteBillToList(code: string): Observable<ConfirmResponse> {
    const url = `${this.baseUrl}/api/v1/delete-factura/${code}`;
    return this.http.delete<ConfirmResponse>(url);
  }

  cleanListBills(): Observable<ConfirmResponse> {
    const url = `${this.baseUrl}/api/v1/clear-lista`;
    return this.http.delete<ConfirmResponse>(url);
  }

  getOpportunitiesActive(
    paginator?: PaginatorRequest
  ): Observable<ListResponse<Opportunity>> {
    let url;
    if (paginator) {
      const { pagina, elementosPagina, ordenadoPor, enOrden } = paginator;
      url = `${this.baseUrl}/api/v1/oportunidades-inversion/listar-activos?pagina=${pagina}&elementosPagina=${elementosPagina}&ordenadoPor=${ordenadoPor}&enOrden=${enOrden}`;
    } else {
      url = `${this.baseUrl}/api/v1/oportunidades-inversion/listar-activos`;
    }
    return this.http.get<ListResponse<Opportunity>>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getOpportunitiesEnable(
    enable: EnableValue,
    paginator?: PaginatorRequest
  ): Observable<ListResponse<Opportunity>> {
    let url;
    if (paginator) {
      const { pagina, elementosPagina, ordenadoPor, enOrden } = paginator;
      url = `${this.baseUrl}/api/v1/oportunidades-inversion/listar-enable/${enable}?pagina=${pagina}&elementosPagina=${elementosPagina}&ordenadoPor=${ordenadoPor}&enOrden=${enOrden}`;
    } else {
      url = `${this.baseUrl}/api/v1/oportunidades-inversion/listar-enable/${enable}`;
    }
    return this.http.get<ListResponse<Opportunity>>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
