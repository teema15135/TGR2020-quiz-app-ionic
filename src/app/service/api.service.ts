import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
        pmValue: pm,
        latitude: lat,
        longtitude: lng,
        timestamp: time,
        team: '21',
      }),
    });
  }
}
