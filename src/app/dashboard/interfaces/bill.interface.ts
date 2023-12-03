import { Audit, Company } from './';

export interface Bill {
  codigo: string;
  descripcion: string;
  monto: number;
  fechaEmision: string;
  empresa: Company;
  auditoria: Audit;
  activeButton: boolean;
}
