import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SliderComponent } from './slider/slider.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { SetAttributeRowTablePipe } from 'src/pipes/setAttributeRowTable.pipe';
import { BooleansTablePipe } from 'src/pipes/booleansTable.pipe';

@NgModule({
  declarations: [TableComponent, SliderComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    SetAttributeRowTablePipe,
    BooleansTablePipe,
  ],
  exports: [TableComponent, SliderComponent],
})
export class ComponentsModule {}
