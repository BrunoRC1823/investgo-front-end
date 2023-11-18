import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OpportunitiesUserPageComponent } from '../pages/opportunities-user-page/opportunities-user-page.component';
import { OpportunitiesAdminPageComponent } from '../pages/opportunities-admin-page/opportunities-admin-page.component';

const routes: Routes = [
  { path: '', component: OpportunitiesAdminPageComponent },
  { path: 'auction', component: OpportunitiesUserPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpportunitiesRoutingModule {}
