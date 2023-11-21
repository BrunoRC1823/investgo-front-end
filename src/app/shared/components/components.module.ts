import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SliderComponent } from './slider/slider.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { SetAttributeRowTablePipe } from 'src/pipes/setAttributeRowTable.pipe';

@NgModule({
  declarations: [TableComponent, SliderComponent],
  imports: [CommonModule,PrimeNgModule, SetAttributeRowTablePipe],
  exports: [TableComponent, SliderComponent],
})
export class ComponentsModule {}
