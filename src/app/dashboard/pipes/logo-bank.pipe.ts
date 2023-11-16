import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'logoBank'
})
export class LogoBankPipe implements PipeTransform {

  transform(nameBank: string): string {
    if(!nameBank) return '/assets/img/bbva-logo.png'
    const name = nameBank.toLowerCase();
    const urlImg = `/assets/img/${name}-logo.png`;
    return urlImg;
  }

}
