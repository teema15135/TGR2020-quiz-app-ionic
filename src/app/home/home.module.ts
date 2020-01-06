import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { ScanningPageModule } from './scanning/scanning.module';

import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),

    ScanningPageModule,
  ],
  declarations: [HomePage, TimeAgoPipe],
})
export class HomePageModule {}
