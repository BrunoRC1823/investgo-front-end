import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsPageComponent } from '../layouts/bills-page.component';

const routes: Routes = [
  { path: '', component: BillsPageComponent },
  { path: 'show-bill/:codigo', component: BillsPageComponent },
  { path: 'company/:codigo', component: BillsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsRoutingModule {}
