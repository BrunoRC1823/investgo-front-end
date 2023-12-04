import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceTitlePipe',
  standalone: true,
})
export class ReduceTitlePipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 15) {
      return value.substring(0, 15) + '...';
    }
    return value;
  }
}
