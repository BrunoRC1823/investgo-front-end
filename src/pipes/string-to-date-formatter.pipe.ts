import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform, inject } from '@angular/core';

@Pipe({
  name: 'stringToDateFormatter',
})
export class StringToDateFormatterPipe implements PipeTransform {
  private datePipe = inject(DatePipe);
  transform(fechaString: string, formato: string): unknown {
    if(fechaString === null || fechaString === null){
      return formato;
    }
    const fecha = new Date(fechaString);
    if (!isNaN(fecha.getTime())) {
      return this.datePipe.transform(fecha, formato) || '';
    }
    return formato;
  }
}
