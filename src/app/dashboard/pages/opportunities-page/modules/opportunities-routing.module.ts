import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OpportunitiesUserPageComponent } from '../pages/opportunities-user-page/opportunities-user-page.component';
import { OpportunitiesAdminPageComponent } from '../pages/opportunities-admin-page/opportunities-admin-page.component';
import { OpportunitiesFormPageComponent } from '../pages/opportunities-form-page/opportunities-form-page.component';
import { hasRoleGuard } from 'src/app/guards/hasRole.guard';

const routes: Routes = [
  {
    canMatch: [hasRoleGuard],
    path: 'list-opportunities',
    component: OpportunitiesAdminPageComponent,
  },

  {
    canMatch: [hasRoleGuard],
    path: 'add-opportunity',
    component: OpportunitiesFormPageComponent,
  },
  { path: 'auction', component: OpportunitiesUserPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpportunitiesRoutingModule {}
