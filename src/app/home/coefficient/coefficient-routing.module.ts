import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoefficientPage } from './coefficient.page';

const routes: Routes = [
  {
    path: '',
    component: CoefficientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoefficientPageRoutingModule {}
