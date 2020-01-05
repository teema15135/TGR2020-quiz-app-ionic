import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanningModalPageComponent } from './scanning.page';

const routes: Routes = [
  {
    path: '',
    component: ScanningModalPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanningPageRoutingModule {}
