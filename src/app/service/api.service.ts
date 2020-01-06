import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'https://tgr2020-quiz2.firebaseio.com';
  loraURL = 'https://loraiot.cattelecom.com/portal/iotapi';

  constructor() { }

  getPMData() {
    return fetch(`${this.apiURL}/quiz/sensor/team21.json`);
  }

  sendLocationData(pm, lat, lng, time) {
    return fetch(`${this.apiURL}/quiz/location/team21.json`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        pmValue: Number(pm),
        latitude: Number(lat),
        longtitude: Number(lng),
        timestamp: time,
        team: '21',
      }),
    });
  }

  getDownlinkToken() {
    return fetch(`${this.loraURL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        Accept : 'application/json',
      },
      body: JSON.stringify({
        username : 'TESA14TH021',
        password : '54115522',
      })
    });
  }

  sendDownlinkMessage(payloadHex, accessToken) {
    return fetch(`${this.loraURL}/core/devices/AA00DBCA14EF1421/downlinkMessages`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        Accept : 'application/json',
        Authorization : `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        payloadHex,
        targetPorts : '05'
      })
    });
  }
}
