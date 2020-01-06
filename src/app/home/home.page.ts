import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

import { ModalController, AlertController } from '@ionic/angular';
import { ScanningModalPageComponent } from './scanning/scanning.page';
import { CoefficientPage } from './coefficient/coefficient.page';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  isLoading = true;
  currentPM = 0;

  warningMessage = 'Loading...';

  lastTime: string;
  lat: string;
  lng: string;

  arrData = [];

  last5Data = [];

  scanDisable = true;

  color = 'primary';
  buttonColor = 'secondary';

  constructor(
    private apiService: ApiService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    // setInterval(() => {
    //   console.log(this.last5Data);
    // }, 3000);

    this.loadPMData(null);
  }

  loadPMData(event) {
    this.apiService
      .getPMData()
      .then(res => res.json())
      .then(data => {
        this.arrData = [];
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
            try {
              this.arrData.push({
                time: lastData.Time,
                lat: lastData.LrrLAT,
                lng: lastData.LrrLON,
                pm: Number.parseInt(lastData.payload_hex.slice(2, 4), 16)
              });
            } catch { }
          }
        }
        try {
          this.currentPM = Number.parseInt(
            lastData.payload_hex.slice(2, 4),
            16
          );
          this.isLoading = false;
          // this.currentPM = 100;
          this.updateBackgroundAndWarningMessage();
        } catch {
          // do nothing
        }

        this.last5Data = this.arrData
          .slice(Math.max(this.arrData.length - 6, 1))
          .reverse();
        this.scanDisable = false;

        if (event) {
          event.target.complete();
        }
      });
  }

  updateBackgroundAndWarningMessage() {
    if (this.currentPM === 191) {
      this.color = 'primary';
      this.warningMessage = 'Sensor error';
    }
    if (this.currentPM <= 12) {
      this.color = 'good';
      this.warningMessage = 'Good';
    } else if (this.currentPM <= 35) {
      this.color = 'moderate';
      this.warningMessage = 'Moderate';
    } else if (this.currentPM <= 55) {
      this.color = 'nearlyunhealthy';
      this.warningMessage = 'Nearly unhealthy';
    } else if (this.currentPM <= 150) {
      this.color = 'unhealthy';
      this.warningMessage = 'Unhealthy';
    } else if (this.currentPM <= 250) {
      this.color = 'veryunhealthy';
      this.warningMessage = 'Very unhealthy';
    } else {
      this.color = 'hazardous';
      this.warningMessage = 'Hazardous';
    }
  }

  async scanForPM() {
    const modal = await this.modalController.create({
      component: ScanningModalPageComponent,
      componentProps: {
        pmValue: this.currentPM,
        lat: this.lat,
        lng: this.lng,
        time: this.lastTime
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data === 'complete') {
      this.presentAlert('Successful', 'Geolocation sent!');
    } else {
      this.presentAlert('Fail', 'Fail to send geolocation');
    }
  }

  async updateCoefficient() {
    const modal = await this.modalController.create({
      component: CoefficientPage,
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data === 'complete') {
        this.presentAlert('Successful', 'Downlink payload queued!');
      } else if (detail.data === 'cancel') {
        // do nothing
      } else {
        this.presentAlert('Fail', 'Fail to send downlink');
      }
    });

    await modal.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
