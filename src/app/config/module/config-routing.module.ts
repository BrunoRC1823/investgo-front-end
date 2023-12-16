import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordPageComponent } from '../pages/change-password-page/change-password-page.component';

const routes: Routes = [
  { path: 'change-password', component: ChangePasswordPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigRoutingModule {}
