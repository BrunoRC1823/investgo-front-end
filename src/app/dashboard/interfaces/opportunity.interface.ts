import { Audit, Company } from './';

export interface Opportunity {
  codigo: string;
  rendimiento: number;
  tir: number;
  enProceso: boolean;
  terminado: boolean;
  monto: number;
  montoRecaudado: number;
  fechaCaducidad: string;
  auditoria: Audit;
  fechaPago: string;
  empresa: Company;
}
