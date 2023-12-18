import { Audit } from 'src/app/dashboard/interfaces';

export interface User {
  id?: string;
  codigo: string;
  nombre: string;
  apellidoPa: string;
  apellidoMa: string;
  telefono: string;
  correo: string;
  username: string;
  dni: string;
  foto: string;
  auditoria?: Audit;
  rol: Rol;
}
export interface Rol {
  id: number;
  codigo: string;
  rol: string;
}
