import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { EnableValue } from 'src/app/auth/enums/enable-value.enum';
import { ConfirmResponse } from 'src/app/shared/interfaces/confirm-response.interface';
import { environments } from 'src/environments/environments';
import { PaginatorRequest, ListResponse } from '../interfaces';
import { Bill } from '../interfaces/bill.interface';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private readonly baseUrl = environments.baseUrl;

  private http = inject(HttpClient);

  register(bill: Bill): Observable<ConfirmResponse> {
    const url = `${this.baseUrl}/api/v1/facturas`;
    if (bill.codigo) {
      return this.http.put<ConfirmResponse>(url, bill);
    }
    return this.http.post<ConfirmResponse>(url, bill);
  }

  deleteBill(code: string): Observable<ConfirmResponse> {
    const url = `${this.baseUrl}/api/v1/facturas/${code}`;
    return this.http.delete<ConfirmResponse>(url);
  }

  getBillByCode(code: string): Observable<Bill> {
    const url = `${this.baseUrl}/api/v1/facturas/${code}`;
    return this.http.get<Bill>(url).pipe(
      map((bill) => {
        return bill as Bill;
      }),
      catchError((err) => throwError(() => err))
    );
  }
  getBillsByCompanyActive(
    code: string,
    paginator?: PaginatorRequest
  ): Observable<ListResponse<Bill>> {
    let url;
    if (paginator) {
      const { pagina, elementosPagina, ordenadoPor, enOrden } = paginator;
      url = `${this.baseUrl}/api/v1/facturas/buscar-activos/${code}?pagina=${pagina}&elementosPagina=${elementosPagina}&ordenadoPor=${ordenadoPor}&enOrden=${enOrden}`;
    } else {
      url = `${this.baseUrl}/api/v1/facturas/buscar-activos/${code}`;
    }
    return this.http.get<ListResponse<Bill>>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getBillsByCompany(
    code: string,
    enable: EnableValue,
    paginator?: PaginatorRequest
  ): Observable<ListResponse<Bill>> {
    let url;
    if (paginator) {
      const { pagina, elementosPagina, ordenadoPor, enOrden } = paginator;
      url = `${this.baseUrl}/api/v1/facturas/buscar-enable/${code}&${enable}?pagina=${pagina}&elementosPagina=${elementosPagina}&ordenadoPor=${ordenadoPor}&enOrden=${enOrden}`;
    } else {
      url = `${this.baseUrl}/api/v1/facturas/buscar-enable/${code}&${enable}`;
    }
    return this.http.get<ListResponse<Bill>>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
