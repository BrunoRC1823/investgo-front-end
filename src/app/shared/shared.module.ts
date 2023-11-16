import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './components/slider/slider.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [SliderComponent,TableComponent],
  imports: [CommonModule, PrimeNgModule],
  exports: [SliderComponent,TableComponent],
})
export class SharedModule {}
