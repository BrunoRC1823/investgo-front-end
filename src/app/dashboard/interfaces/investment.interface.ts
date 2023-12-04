import { User } from 'src/app/auth/interfaces/user.interface';
import { Audit, Opportunity } from '.';

export interface Investment {
  codigo: string;
  oportunidadInversion: Opportunity;
  montoInvertido: number;
  ganancia: number;
  auditoria: Audit;
  usuario: User;
}
