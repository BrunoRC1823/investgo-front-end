import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login-page/login-page.component';
import { RegisterComponent } from '../register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule,ReactiveFormsModule,PrimeNgModule],
  exports: [LoginComponent, RegisterComponent],
})
export class PagesModule {}
