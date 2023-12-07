import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { OpportunitiesAdminPageComponent } from '../opportunities-admin-page/opportunities-admin-page.component';
import { OpportunitiesUserPageComponent } from '../opportunities-user-page/opportunities-user-page.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { ComponentsModule } from '../components/module/components.module';
import { OpportunitiesFormPageComponent } from '../opportunities-form-page/opportunities-form-page.component';
import { DirectiveModule } from 'src/app/directive/directive.module';

@NgModule({
  declarations: [
    OpportunitiesAdminPageComponent,
    OpportunitiesUserPageComponent,
    OpportunitiesFormPageComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ComponentsModule,
    ReactiveFormsModule,
    DirectiveModule,
  ],
})
export class PagesModule {}
