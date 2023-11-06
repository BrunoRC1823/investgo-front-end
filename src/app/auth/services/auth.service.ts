import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable, catchError, map, tap, throwError } from 'rxjs';

import { AuthStatus } from '../enums/auth-status.enum';
import { environments } from 'src/environments/environments';
import { LoginRequest } from '../interfaces/login-request.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { User } from '../interfaces/user.interface';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // public loginStatusSubject = new Subject<boolean>();
  private readonly baseUrl: string = environments.baseUrl;

  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  // constructor() {
  //   this.checkAuthStatus().subscribe();
  // }

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
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

  getUserRole(): string | null | undefined {
    const user: User | null = this._currentUser();
    if (user === null) return null;
    return user.rol!.codigo;
  }

  register(user: User): Observable<{ mensaje: string }> {
    const url = `${this.baseUrl}/api/v1/sing-up`;
    return this.http.post<{ mensaje: string }>(url, user);
  }

  // checkAuthStatus(): Observable<boolean> {
  //   const url = `${this.baseUrl}/auth/check-token`;
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     this.logout();
  //     return of(false);
  //   }

  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
  //     map(({ token, user }) => this.setAuthentication(user, token)),
  //     catchError(() => {
  //       this._authStatus.set(AuthStatus.notAuthenticated);
  //       return of(false);
  //     })
  //   );
  // }
}
