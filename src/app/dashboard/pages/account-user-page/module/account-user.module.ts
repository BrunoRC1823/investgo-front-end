import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesModule } from '../pages/module/pages.module';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { UserAccountRoutingModule } from './account-user-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    PrimeNgModule,
    SharedModule,
    ReactiveFormsModule,
    PagesModule,
  ],
  exports: [],
})
export class UserAccountModule {}
