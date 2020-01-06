import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-coefficient',
  templateUrl: './coefficient.page.html',
  styleUrls: ['./coefficient.page.scss'],
})
export class CoefficientPage implements OnInit {

  coefForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private apiService: ApiService) { }

  ngOnInit() {
    this.coefForm = this.formBuilder.group({
      value: ['', [Validators.required, Validators.min(30), Validators.max(200)]]
    });
  }

  send() {
    const hex = Number(this.coefForm.value.value).toString(16);
    this.apiService.getDownlinkToken()
      .then(resToken => resToken.json())
      .then(dataToken => {
        console.log(dataToken);
        this.apiService.sendDownlinkMessage(hex, dataToken.access_token)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.status === 'QUEUED') {
              this.modalController.dismiss('complete');
            } else {
              console.log('Error response from cattelecom');
              this.modalController.dismiss('fail');
            }
          });
      })
      .catch(err => {
        console.log(err);
        this.modalController.dismiss('fail');
      });
  }

  cancel() {
    this.modalController.dismiss('cancel');
  }
}
