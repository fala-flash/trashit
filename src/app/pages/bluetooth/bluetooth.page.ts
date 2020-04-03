import { Component, OnInit } from '@angular/core';
import {  NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { ToastController } from '@ionic/angular';


const serv = 'ffe0';
const char = 'ffe1';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})



export class BluetoothPage implements OnInit {

  devices:any[] = [];

  constructor(private ble:BLE,private ngZone: NgZone, public toastController: ToastController) { }

  ngOnInit() {
    this.ble.enable();
  }

  async presentToastConnected(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  

  Scan(){
    this.devices = [];
    this.ble.scan([],15).subscribe(
      device => this.onDeviceDiscovered(device)
    );
      
  }
  onDeviceDiscovered(device){
    console.log('Discovered' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device)
      if (device.id === '9C:1D:58:90:C2:AA') {
        this.connect();
      }
    })
  }

  connect(){
    this.ble.connect('9C:1D:58:90:C2:AA').subscribe(data => {
      this.OnConnectionSuccesfull(data);
    });
  }


  OnConnectionSuccesfull(data: any) {
    this.ble.startNotification(data.id, serv, char).subscribe(res => {
      this.onDataChanged(res);
    }, err => this.presentToastConnected(err))
  }


  onDataChanged(res: ArrayBuffer) {
    var value = new Uint8Array(res);
    this.presentToastConnected(value[0]);
  }




}
