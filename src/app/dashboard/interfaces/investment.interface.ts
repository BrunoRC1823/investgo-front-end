import { User } from 'src/app/auth/interfaces/user.interface';
import { Audit, InvestmentOpportunity } from '.';

export interface Investment {
  codigo: string;
  oportunidadInversion: InvestmentOpportunity;
  montoInvertido: number;
  ganancia: number;
  auditoria: Audit;
  usuario: User;
}
