

export interface User {
  codigo: string;
  nombre: string;
  apellidoPa: string;
  apellidoMa: string;
  telefono: string;
  correo: string;
  username: string;
  dni: string;
  foto: string;
  rol: Rol;
}
export interface Rol {
  id: number;
  codigo: string;
  rol: string;
}
