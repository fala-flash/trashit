import { Injectable } from '@angular/core';
import { NativeGeocoderOptions, NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Subject } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  geocoderopt: NativeGeocoderOptions;
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  geoAdministrativeArea: Subject<string> = new Subject<string>();
  geoAddress: string;

  constructor(private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
    this.geocoderopt = {
      useLocale: true,
      maxResults: 5
    };
  }

  // Get current coordinates of device
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
    this.geoLatitude = resp.coords.latitude;
    this.geoLongitude = resp.coords.longitude;
    this.geoAccuracy = resp.coords.accuracy;
    this.getGeoencoder(this.geoLatitude, this.geoLongitude);
    }, (error) => { alert('Error getting location' + JSON.stringify(error)); }
    );
  }

  // geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude: number, longitude: number) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geocoderopt)
      .then((result: NativeGeocoderResult[]) => {
        this.geoAddress = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  // Return Comma saperated address
  generateAddress(addobj: NativeGeocoderResult) {
    const obj = [];
    let address = '';

    this.geoAdministrativeArea.next(addobj.locality);
    obj.push(addobj.countryCode, addobj.administrativeArea, addobj.subAdministrativeArea, addobj.locality);

    obj.reverse();
    for (const val in obj) {
      if (obj[val].length) {
        address += obj[val] + ', ';
      }
    }
    return address;
  }

  getAddressSubscription() {
    return this.geoAdministrativeArea.asObservable();
  }
}
