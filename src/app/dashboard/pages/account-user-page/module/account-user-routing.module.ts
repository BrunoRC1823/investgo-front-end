import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountUserPageComponent } from '../pages/account-user-page/account-user-page.component';
import { ChangePasswordPageComponent } from '../../../../config/pages/change-password-page/change-password-page.component';

const routes: Routes = [
  { path: 'show', component: AccountUserPageComponent },
  { path: 'edit', component: AccountUserPageComponent },
  { path: 'change-password', component: ChangePasswordPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAccountRoutingModule {}
