import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from '../pages/module/pages.module';
import { ConfigRoutingModule } from './config-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PagesModule, ConfigRoutingModule],
})
export class ConfigModule {}
