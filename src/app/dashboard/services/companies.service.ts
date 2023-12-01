import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Company } from '../interfaces/company.interface';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ConfirmResponse } from 'src/app/shared/interfaces/confirm-response.interface';
import { ListResponse, PaginatorRequest } from '../interfaces';
import { EnableValue } from 'src/app/auth/enums/enable-value.enum';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private readonly baseUrl = environments.baseUrl;

  private http = inject(HttpClient);

  register(company: Company): Observable<ConfirmResponse> {
    const url = `${this.baseUrl}/api/v1/empresas`;
    if (company.codigo) {
      return this.http.put<ConfirmResponse>(url, company);
    }
    return this.http.post<ConfirmResponse>(url, company);
  }

  getCompanyByCode(code: string): Observable<Company> {
    const url = `${this.baseUrl}/api/v1/empresas/${code}`;
    return this.http.get<Company>(url).pipe(
      map((company) => {
        return company as Company;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getCompaniesByRZContains(rz: string): Observable<Company[]> {
    const url = `${this.baseUrl}/api/v1/listar-empresas/buscar/${rz}`;
    return this.http.get<ListResponse<Company>>(url).pipe(
      map((list) => {
        const { content } = list;
        return content;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getCompanies(
    enable: EnableValue,
    paginator?: PaginatorRequest
  ): Observable<ListResponse<Company>> {
    let url;
    if (paginator) {
      const { pagina, elementosPagina, ordenadoPor, enOrden } = paginator;
      url = `${this.baseUrl}/api/v1/listar-empresas/${enable}?pagina=${pagina}&elementosPagina=${elementosPagina}&ordenadoPor=${ordenadoPor}&enOrden=${enOrden}`;
    } else {
      url = `${this.baseUrl}/api/v1/listar-empresas/${enable}`;
    }
    return this.http.get<ListResponse<Company>>(url).pipe(
      map((list) => {
        return list;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  disableCompany(code: string): Observable<ConfirmResponse> {
    const url = `${this.baseUrl}/api/v1/empresas/deshabilitar/${code}`;
    return this.http.delete<ConfirmResponse>(url);
  }
}
