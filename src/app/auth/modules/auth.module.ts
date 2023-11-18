import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from '../layouts/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { PagesModule } from '../pages/modules/pages.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, PagesModule],
})
export class AuthModule {}
