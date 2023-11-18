import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunitiesAdminPageComponent } from '../opportunities-admin-page/opportunities-admin-page.component';
import { OpportunitiesUserPageComponent } from '../opportunities-user-page/opportunities-user-page.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';

@NgModule({
  declarations: [
    OpportunitiesAdminPageComponent,
    OpportunitiesUserPageComponent,
  ],
  imports: [CommonModule, PrimeNgModule],
})
export class PagesModule {}
