import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [DashboardComponent, HomePageComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
