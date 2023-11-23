import { CurrencyPipe } from '@angular/common';
import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'setAttributeRowTable',
  standalone: true,
})
export class SetAttributeRowTablePipe implements PipeTransform {
  transform(valor: any, atributoBuscado: string): unknown {
    if (typeof valor === 'object' && valor !== null) {  
      switch (true) {
        case atributoBuscado in valor:
          let newValue = valor[atributoBuscado];
          return this.isCurrency(newValue);
        case atributoBuscado.includes('.'):
          const attributes = atributoBuscado.split('.');
          let currentLevel = valor;
          for (const attribute of attributes) {
            currentLevel = currentLevel[attribute];
            if (currentLevel === undefined) {
              return 'No found';
            }
          }
          return this.isCurrency(currentLevel);
        default:
          return 'No found';
      }
    } else {
      return this.isCurrency(valor);
    }
  }

  isCurrency(value: any): string {
    if (typeof value === 'number') {
      const newValue = new CurrencyPipe('es-Pe').transform(
        value,
        'PEN',
        'symbol-narrow'
      );
      return newValue!;
    }
    return value;
  }
}
