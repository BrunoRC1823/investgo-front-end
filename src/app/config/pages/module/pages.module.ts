import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordPageComponent } from '../change-password-page/change-password-page.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChangePasswordPageComponent],
  imports: [CommonModule, PrimeNgModule, ReactiveFormsModule],
  exports: [ChangePasswordPageComponent],
})
export class PagesModule {}
