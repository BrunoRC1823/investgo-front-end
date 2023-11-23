import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Company } from '../interfaces/company.interface';
import { Observable } from 'rxjs';
import { ConfirmResponse } from 'src/app/shared/interfaces/confirm-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private readonly baseUrl = environments.baseUrl;

  private http = inject(HttpClient);

  register(company: Company): Observable<ConfirmResponse> {
    const url = `${this.baseUrl}/api/v1/empresas`;
    return this.http.post<ConfirmResponse>(url, company);
  }
}
