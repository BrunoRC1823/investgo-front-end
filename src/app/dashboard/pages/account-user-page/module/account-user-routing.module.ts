import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountUserPageComponent } from '../pages/account-user-page/account-user-page.component';
import { EditAccountUserPageComponent } from '../pages/edit-account-user-page/edit-account-user-page.component';
import { ChangePasswordPageComponent } from '../pages/change-password-page/change-password-page.component';

const routes: Routes = [
  { path: 'show', component: AccountUserPageComponent },
  { path: 'edit', component: EditAccountUserPageComponent },
  { path: 'change-password', component: ChangePasswordPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAccountRoutingModule {}
