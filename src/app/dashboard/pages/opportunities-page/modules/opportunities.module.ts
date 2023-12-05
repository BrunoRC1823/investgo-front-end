import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from '../pages/modules/pages.module';
import { OpportunitiesRoutingModule } from './opportunities-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PagesModule, OpportunitiesRoutingModule],
})
export class OpportunitiesModule {}
