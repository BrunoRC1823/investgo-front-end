import { CurrencyPipe } from '@angular/common';
import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleansTable',
  standalone: true,
})
export class BooleansTablePipe implements PipeTransform {
  transform(value: any, head: any): unknown {
    if (typeof value === 'boolean') {
      if (head === 'Estado') {
        return value ? 'Activo' : 'No Activo';
      }
      if (head === 'Deuda') {
        return value ? 'A tiempo' : 'Pagada';
      }
    }
    return value;
  }
}
