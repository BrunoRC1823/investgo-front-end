import { HttpClient } from '@angular/common/http';

import { Injectable, inject } from '@angular/core';
import { map, catchError, throwError, Observable } from 'rxjs';
import { Bank, BankAccount, Currency } from 'src/app/dashboard/interfaces';

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
  register(account: BankAccount): Observable<{ mensaje: string }> {
    const url = `${this.baseUrl}/api/v1/cuentas-bancarias`;
    return this.http.post<{ mensaje: string }>(url, account);
  }
}
