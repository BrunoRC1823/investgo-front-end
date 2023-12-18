import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { AuthStatus } from '../enums/auth-status.enum';
import { CheckTokenResponse } from '../interfaces/check-token-response.interface';
import { environments } from 'src/environments/environments';
import { LoginRequest } from '../interfaces/login-request.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { User } from '../interfaces/user.interface';
import { ConfirmResponse } from 'src/app/shared/interfaces/confirm-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environments.baseUrl;

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  private http = inject(HttpClient);

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }

  login(loginRequest: LoginRequest): Observable<string> {
    const url = `${this.baseUrl}/api/v1/auth/login`;
    return this.http.post<LoginResponse>(url, loginRequest).pipe(
      map(({ user, token, mensaje }) => {
        this.setAuthentication(user, token);
        return mensaje;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  logout(): void {
    localStorage.clear();
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
  getFullNameCurrentUser(): string {
    const currentUser = this.currentUser();
    if (currentUser === null) return '';
    const { nombre, apellidoPa } = currentUser;

    return `${nombre} ${apellidoPa}`;
  }
  getUsername(): string {
    const currentUser = this.currentUser();
    if (currentUser === null) return '';
    const { username } = currentUser;
    return `${username}`;
  }
  getUserRole(): string | null | undefined {
    const user: User | null = this._currentUser();
    if (user === null) return null;
    return user.rol!.codigo;
  }
  public getToken() {
    return localStorage.getItem('token');
  }

  register(user: User): Observable<ConfirmResponse> {
    const url = `${this.baseUrl}/api/v1/sing-up`;
    return this.http.post<ConfirmResponse>(url, user);
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/api/v1/check-token`;
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }
    return this.http.get<CheckTokenResponse>(url).pipe(
      map(({ token, user }) => {
        this.setAuthentication(user, token);
        return true;
      }),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }
}
