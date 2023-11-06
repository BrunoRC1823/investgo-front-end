import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './components/slider/slider.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, PrimeNgModule],
  exports: [SliderComponent],
})
export class SharedModule {}
