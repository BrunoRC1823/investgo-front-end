import { HttpClient } from '@angular/common/http';

import { Injectable, inject } from '@angular/core';
import { map, catchError, throwError, Observable } from 'rxjs';
import {
  Bank,
  BankAccount,
  Currency,
  ListResponse,
} from 'src/app/dashboard/interfaces';
import { ConfirmResponse } from 'src/app/shared/interfaces/confirm-response.interface';

import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);

  listBanks(): Observable<Bank[]> {
    const url = `${this.baseUrl}/api/v1/bancos`;
    return this.http.get<Bank[]>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  listCurrency(): Observable<Currency[]> {
    const url = `${this.baseUrl}/api/v1/monedas`;
    return this.http.get<Currency[]>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  listCardsAccounts(): Observable<ListResponse<BankAccount | null>> {
    const url = `${this.baseUrl}/api/v1/cuentas-bancarias`;
    return this.http.get<ListResponse<BankAccount>>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  register(account: BankAccount): Observable<ConfirmResponse> {
    const url = `${this.baseUrl}/api/v1/cuentas-bancarias`;
    return this.http.post<ConfirmResponse>(url, account);
  }
}
