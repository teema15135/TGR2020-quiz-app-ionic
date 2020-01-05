import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'https://tgr2020-quiz2.firebaseio.com';

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
}
