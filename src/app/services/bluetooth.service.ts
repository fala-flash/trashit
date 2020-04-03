import { Injectable } from '@angular/core';
import {  NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { ToastController } from '@ionic/angular';


const serv = 'ffe0';
const char = 'ffe1';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {


  devices:any[] = [];

  stringa: any[] = [4];

  num: number = 0;

  constructor(private ble:BLE,private ngZone: NgZone, public toastController: ToastController) { }



  enableBluetooth(){
    this.ble.enable();
  }

  async presentToastConnected(msg: string) {
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
    if (value[0] != 10 && this.num != 4) {
      this.stringa[this.num] = String.fromCharCode(value[0]);
      this.num++;
    }
    else if (this.num == 4 || value[0] == 10) {
      this.num = 0;
      this.presentToastConnected(this.generateString());
    }

  }

  generateString(): string{
    var s: string = this.stringa.join('');
    return s;
  }
}
