import { Injectable, inject } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import {
  ListResponse,
  PaginatorRequest,
  Transaction,
  TransactionType,
} from '../interfaces';
import { environments } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { ConfirmResponse } from 'src/app/shared/interfaces/confirm-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly baseUrl: string = environments.baseUrl;

  private http = inject(HttpClient);

  register(transaction: Transaction): Observable<ConfirmResponse> {
    const { tipoTransaccion } = transaction;
    let url;
    if (tipoTransaccion.id === 1) {
      url = `${this.baseUrl}/api/v1/transacciones/deposito`;
    } else {
      url = `${this.baseUrl}/api/v1/transacciones/retiro`;
    }
    return this.http.post<ConfirmResponse>(url, transaction);
  }

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

  getTransactionsByType(
    type: Number,
    paginator?: PaginatorRequest
  ): Observable<ListResponse<Transaction>> {
    let url;
    if (paginator) {
      const { pagina, elementosPagina, ordenadoPor, enOrden } = paginator;
      url = `${this.baseUrl}/api/v1/transacciones/listar-tipo?pagina=${pagina}&elementosPagina=${elementosPagina}&ordenadoPor=${ordenadoPor}&enOrden=${enOrden}`;
    } else {
      url = `${this.baseUrl}/api/v1/transacciones/listar-tipo/${type}`;
    }
    return this.http.get<ListResponse<Transaction>>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getTypeTransactions(): Observable<TransactionType[]> {
    const url = `${this.baseUrl}/api/v1/tipos-transacciones`;
    return this.http.get<TransactionType[]>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
