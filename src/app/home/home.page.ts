import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

import { ModalController } from '@ionic/angular';
import { ScanningModalPageComponent } from './scanning/scanning.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  currentPM = 0;

  lastTime: string;
  lat: string;
  lng: string;

  constructor(
    private apiService: ApiService,
    private modalController: ModalController,
    ) { }

  ngOnInit(): void {
    this.apiService.getPMData()
      .then(res => res.json())
      .then(data => {
        let lastData = null;
        const UPLINK = 'DevEUI_uplink';
        for (const key in data) {
          if (!data.hasOwnProperty(key)) {
            continue;
          }
          if (data[key][UPLINK]) {
            lastData = data[key][UPLINK];
            this.lastTime = lastData.Time;
            this.lat = lastData.LrrLAT;
            this.lng = lastData.LrrLON;
          }
        }
        try {
          this.currentPM = Number.parseInt(lastData.payload_hex.slice(2, 4), 16);
        } catch {
          // do nothing
        }
      });
  }

  async scanForPM() {
    const modal = await this.modalController.create({
      component: ScanningModalPageComponent,
      componentProps: {
        pmValue: this.currentPM,
        lat: this.lat,
        lng: this.lng,
        time: this.lastTime,
      }
    });
    return await modal.present();
  }

}
