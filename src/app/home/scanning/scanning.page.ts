import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

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
    private modalController: ModalController
    ) { }

  ngOnInit() {
    /* TODO: change this fucking little shit to real api caller */
    const self = this;
    setTimeout(() => {
      console.log({
        pm: self.pmValue,
        lat: self.lat,
        lng: self.lng,
        time: self.time,
      });
      self.modalController.dismiss();
    }, 5000);
  }

}
