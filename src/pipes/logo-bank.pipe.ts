import { Pipe, PipeTransform } from '@angular/core';
import { Bank } from 'src/app/dashboard/interfaces';

@Pipe({
  name: 'logoBank',
})
export class LogoBankPipe implements PipeTransform {
  transform(bank: Bank): string {
    if (bank) {
      const { nombre } = bank;
      if (!nombre) return '/assets/img/bbva-logo.png';
      const name = nombre!.toLowerCase();
      const urlImg = `/assets/img/${name}-logo.png`;
      return urlImg;
    }
    return '/assets/img/bbva-logo.png';
  }
}
