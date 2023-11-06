import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports: [
    ButtonModule,
    CarouselModule,
    InputTextModule,
    TagModule,
    ToastModule,
  ],
})
export class PrimeNgModule {}
