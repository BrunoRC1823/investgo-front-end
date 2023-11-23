import { Audit, Company } from '.';

export interface InvestmentOpportunity {
  codigo: string;
  rendimiento: number;
  tir: number;
  enProceso: boolean;
  monto: number;
  montoRecaudado: number;
  fechaCaducidad: string;
  auditoria: Audit;
  fechaPago: string;
  empresa: Company;
}
