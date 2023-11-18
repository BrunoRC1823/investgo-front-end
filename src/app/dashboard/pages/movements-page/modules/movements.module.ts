import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ComponentsModule } from '../components/modules/components.module';
import { PageModule } from '../page/modules/page.module';
import { MovementsRoutingModule } from './movements-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimeNgModule,
    SharedModule,
    ComponentsModule,
    PageModule,
    MovementsRoutingModule,
  ],
})
export class MovementsModule {}
