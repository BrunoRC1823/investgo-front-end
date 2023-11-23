import { Audit, Risk } from '.';

export interface Company {
  codigo: string;
  nomRepLegal: string;
  apeRepLegal: string;
  nombre: string;
  ruc: string;
  razonSocial: string;
  fecIniActv: string;
  direccion: string;
  telefono: string;
  correo: string;
  sector: string;
  riesgo: Risk;
  auditoria: Audit;
}
