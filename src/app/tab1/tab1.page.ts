import { DatabaseService } from './../services/database.service';
import { BluetoothService } from './../services/bluetooth.service';

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  user: any = {};
  userReady: boolean = false;

  constructor(
    private auth: AuthService,
    private nativeStorage: NativeStorage,
    private bluetooth: BluetoothService,
    private database: DatabaseService) {}

 async ngOnInit() {
    await this.nativeStorage.getItem("google_user").then(data => {
      this.user = {
        name: data.name,
        email: data.email,
        picture: data.picture
      }
      this.userReady = true;
    }, error =>{
      console.log(error);
    })
    this.bluetooth.initialize().then(s => {
      if (s) {
        this.bluetooth.getAddressSubscription().subscribe(data => {
          console.log(data);
          this.database.getBasketByLocation(data).subscribe(macdata => {
            this.bluetooth.setMac(macdata['mac']);
            console.log('Initialize done');
            console.log(macdata['mac']);
            this.bluetooth.enableBluetooth();
            this.bluetooth.sendMessage();
          })
        });
      }
    });
  }

  exitApp(){
    this.auth.doGoogleLogout();
  }


}
