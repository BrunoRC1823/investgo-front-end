import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number, currencyCode?: string): string {
    if (!value) {
      value = 2500;
    }
    if (!currencyCode || currencyCode === 'PEN') {
      return `S/.${value.toFixed(2)}`;
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
      }).format(value);
    }
  }
}
