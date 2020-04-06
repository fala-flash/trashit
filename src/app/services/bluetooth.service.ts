import { Tab4Page } from './../tab4/tab4.page';
import { Injectable } from '@angular/core';
import {  NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { ToastController } from '@ionic/angular';


const mac = '9C:1D:58:90:C2:AA';
const serv = 'ffe0';
const char = 'ffe1';


@Injectable({
  providedIn: 'root'
})
export class BluetoothService {


  devices:any[] = [];

  stringa: any[] = [4];

  num: number = 0;

  constructor(private ble:BLE,private ngZone: NgZone, public toastController: ToastController, private status: Tab4Page) { }



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
      if (device.id === mac) {
        this.connect();
      }
    })
  }

  connect(){
    this.ble.connect(mac).subscribe(data => {
      this.OnConnectionSuccesfull(data);
    });
  }


  OnConnectionSuccesfull(data: any) {
    this.message();
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
      this.ble.disconnect(mac).then(() => {
        this.presentToastConnected(this.generateString());
        this.status.getPaperStatus(this.generateString());
        this.status.getPlasticStatus(this.generateString());
      });;
      
    }

  }

  generateString(): string{
    var s: string = this.stringa.join('');
    return s;
  }


  sendMessage(){
    this.ble.isConnected(mac).then(() => {
      this.message();
    }, () => {
      this.Scan();
    })  
  }

  message(){
    var data = new Uint8Array(1);
    data[0] = 111;
    this.ble.write(mac, serv, char, data.buffer).then(() => {
      console.log('hello arduino');
    })
  }

}
