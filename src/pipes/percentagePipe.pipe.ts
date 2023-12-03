import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentagePipe',
  standalone: true,
})
export class PercentagePipe implements PipeTransform {
  transform(value: number): string {
    const newValue = value * 100;
    return `${newValue}%`;
  }
}
