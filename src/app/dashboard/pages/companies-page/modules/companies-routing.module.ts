import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompaniesPageComponent } from '../pages/companies-page/companies-page.component';
import { FormCompaniesPageComponent } from '../pages/form-companies-page/form-companies-page.component';

const routes: Routes = [
  { path: '', component: CompaniesPageComponent },
  { path: 'add-company', component: FormCompaniesPageComponent },
  { path: 'show-company/:codigo', component: FormCompaniesPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule {}
