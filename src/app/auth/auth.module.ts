import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './pages/login-page/login-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { RegisterComponent } from './pages/register-page/register-page.component';


@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    PrimeNgModule,
  ],
})
export class AuthModule {}
