import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-scanning',
  templateUrl: './scanning.page.html',
  styleUrls: ['./scanning.page.scss'],
})
export class ScanningModalPageComponent implements OnInit {

  @Input() pmValue: number;
  @Input() lat: string;
  @Input() lng: string;
  @Input() time: string;

  RADAR_IMG_PATH = '../../assets/images/radar.gif';

  constructor(
    private modalController: ModalController,
    private apiService: ApiService,
    private geolocation: Geolocation,
  ) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition({ timeout: 10000 })
      .then((resp) => {
        console.log(resp.coords);
        this.apiService.sendLocationData(this.pmValue, this.lat, this.lng, this.time)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.modalController.dismiss('complete');
          });
      }).catch((error) => {
        console.log('Error getting location', error);
        this.modalController.dismiss('fail');
      });
  }

}
