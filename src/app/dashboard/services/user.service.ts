import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable, catchError, map, throwError } from 'rxjs';

import { environments } from 'src/environments/environments';
import { Balance } from '../interfaces/balance.interface';
import { ConfirmResponse } from 'src/app/shared/interfaces/confirm-response.interface';
import { ChangePasswordRequest } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl: string = environments.baseUrl;
  private _currentBalance = signal<Balance>({ saldo: 0 });

  public currentBalance = computed(() => this._currentBalance());

  private http = inject(HttpClient);

  getCurrentWallet(): Observable<void> {
    const url = `${this.baseUrl}/api/v1/carteras`;
    return this.http.get<Balance>(url).pipe(
      map((balance) => {
        this._currentBalance.set(balance);
      }),
      catchError((err) => throwError(() => err))
    );
  }

  changePassword(req: ChangePasswordRequest): Observable<ConfirmResponse> {
    const url = `${this.baseUrl}/api/v1/usuarios-user/password`;
    return this.http.put<ConfirmResponse>(url, req);
  }
}
