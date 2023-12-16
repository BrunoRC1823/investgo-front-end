import { NgModule } from '@angular/core';

import { AccountUserPageComponent } from '../account-user-page/account-user-page.component';
import { EditAccountUserPageComponent } from '../edit-account-user-page/edit-account-user-page.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccountUserPageComponent, EditAccountUserPageComponent],
  imports: [CommonModule, ReactiveFormsModule, PrimeNgModule],
  exports: [AccountUserPageComponent, EditAccountUserPageComponent],
})
export class PagesModule {}
