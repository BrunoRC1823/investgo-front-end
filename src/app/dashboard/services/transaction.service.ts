import { Injectable, inject } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ListResponse, PaginatorRequest, Transaction } from '../interfaces';
import { environments } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly baseUrl: string = environments.baseUrl;

  private http = inject(HttpClient);

  getTransactions(
    paginator?: PaginatorRequest
  ): Observable<ListResponse<Transaction>> {
    let url;
    if (paginator) {
      const { pagina, elementosPagina, ordenadoPor, enOrden } = paginator;
      url = `${this.baseUrl}/api/v1/transacciones/listar?pagina=${pagina}&elementosPagina=${elementosPagina}&ordenadoPor=${ordenadoPor}&enOrden=${enOrden}`;
    } else {
      url = `${this.baseUrl}/api/v1/transacciones/listar`;
    }
    return this.http.get<ListResponse<Transaction>>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getTransactionsByType(type: Number): Observable<ListResponse<Transaction>> {
    const url = `${this.baseUrl}/api/v1/transacciones/listar-tipo/${type}`;
    return this.http.get<ListResponse<Transaction>>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
