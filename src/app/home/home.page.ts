import { Component, OnInit } from "@angular/core";
import { ApiService } from "../service/api.service";

import { ModalController, AlertController } from "@ionic/angular";
import { ScanningModalPageComponent } from "./scanning/scanning.page";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  currentPM = 0;

  lastTime: string;
  lat: string;
  lng: string;

  arr_data = [];

  last5Data = [];

  scanDisable = true;

  constructor(
    private apiService: ApiService,
    private modalController: ModalController,
    private alertController: AlertController,
  ) {}

  ngOnInit(): void {

    // setInterval(() => {
    //   console.log(this.last5Data);
    // }, 3000);

    this.apiService
      .getPMData()
      .then(res => res.json())
      .then(data => {
        this.arr_data = [];
        let lastData = null;
        const UPLINK = "DevEUI_uplink";
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
              this.arr_data.push({
                time: lastData.Time,
                lat: lastData.LrrLAT,
                lng: lastData.LrrLON,
                pm: Number.parseInt(lastData.payload_hex.slice(2, 4), 16)
              });
            } catch {}
          }
        }
        try {
          this.currentPM = Number.parseInt(
            lastData.payload_hex.slice(2, 4),
            16
          );
        } catch {
          // do nothing
        }

        this.last5Data = this.arr_data.slice(Math.max(this.arr_data.length - 6, 1)).reverse();
        this.scanDisable = false;
      });
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

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
