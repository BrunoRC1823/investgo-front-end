import { Pipe, type PipeTransform } from '@angular/core';
import { Audit } from '../app/dashboard/interfaces/index';
@Pipe({
  name: 'setAttributeRowTable',
  standalone: true,
})
export class SetAttributeRowTablePipe implements PipeTransform {
  transform(valor: any, atributoBuscado: string): unknown {
    if (typeof valor === 'object' && valor !== null) {
      switch (true) {
        case atributoBuscado in valor:
          return valor[atributoBuscado] || 'No found';
        default:
          return 'No found';
      }
    } else {
      return valor;
    }
  }
}
