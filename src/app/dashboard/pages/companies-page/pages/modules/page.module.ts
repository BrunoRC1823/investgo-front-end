import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCompaniesPageComponent } from '../form-companies-page/form-companies-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { CompaniesPageComponent } from '../companies-page/companies-page.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  declarations: [FormCompaniesPageComponent,CompaniesPageComponent],
  imports: [CommonModule,ReactiveFormsModule,PrimeNgModule,SharedModule],
  exports: [FormCompaniesPageComponent],
})
export class PageModule {}
