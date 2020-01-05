import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanningModalPageComponent } from './scanning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ScanningModalPageComponent],
  entryComponents: [ScanningModalPageComponent],
})
export class ScanningPageModule {}
