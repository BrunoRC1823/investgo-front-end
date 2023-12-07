import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from '../layouts/dashboard.component';
import { PagesModule } from '../pages/pages.module';
import { ComponentsModule } from '../components/modules/components.module';

@NgModule({
  declarations: [DashboardComponent],
  exports: [],
  imports: [
    CommonModule,
    ComponentsModule,
    DashboardRoutingModule,
    HttpClientModule,
    PagesModule,
    PrimeNgModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [DatePipe],
})
export class DashboardModule {}
