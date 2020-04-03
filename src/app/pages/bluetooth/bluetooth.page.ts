import { Component, OnInit } from '@angular/core';
import {  NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

  devices:any[] = [];
  deviceId : '9C:1D:58:90:C2:AA';

  constructor(private ble:BLE,private ngZone: NgZone, public toastController: ToastController) { }

  ngOnInit() {
    this.ble.enable();
  }

  async presentToastConnected() {
    const toast = await this.toastController.create({
      message: `connected to 9C:1D:58:90:C2:AA`,
      duration: 2000
    });
    toast.present();
  }

  async presentToastDisconnected() {
    const toast = await this.toastController.create({
      message: `disconnected from 9C:1D:58:90:C2:AA`,
      duration: 2000
    });
    toast.present();
  }

  onConnected(){
    this.presentToastConnected();
  }

  onDisconnected(){
    this.presentToastDisconnected();
  }

  Scan(){
    this.devices = [];
    this.ble.scan([],15).subscribe(
      device => this.onDeviceDiscovered(device)
    );

    this.autoconnect();
  }
  onDeviceDiscovered(device){
    console.log('Discovered' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device)
      console.log(device)
    })
  }

  autoconnect(){
    this.ble.autoConnect('9C:1D:58:90:C2:AA', this.onConnected, this.onDisconnected);
  }


}
