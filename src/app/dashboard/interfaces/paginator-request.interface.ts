export class PaginatorRequest {
  pagina?: Number = 0;
  elementosPagina?: Number;
  ordenadoPor?: String = 'codigo';
  enOrden?: Sort = 'ASC';
}
type Sort = 'ASC' | 'DESC';
