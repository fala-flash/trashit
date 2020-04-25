import { GeolocationService } from './geolocation.service';
import { DatabaseService } from './database.service';
import { Injectable } from "@angular/core";
import { NgZone } from "@angular/core";
import { BLE } from "@ionic-native/ble/ngx";
import { ToastController } from "@ionic/angular";
import { BehaviorSubject, Observable } from "rxjs";



const serv = "ffe0";
const char = "ffe1";


@Injectable({
  providedIn: "root",
})
export class BluetoothService {


  mac: string = null;

  devices: any[] = [];

  stringa: any[] = [4];

  num: number = 0;

  private PAPERSTATUSSUBJECT = new BehaviorSubject<number>(0);
  private PLASTICSTATUSSUBJECT = new BehaviorSubject<number>(0);

  geoAddress: string = null;

  constructor(
    private ble: BLE,
    private ngZone: NgZone,
    public toastController: ToastController,
    private geolocation: GeolocationService,
    private database: DatabaseService
  ) {}


  public setMac(macaddress){
    this.mac = macaddress;
  }

   async initialize(){
     var status: boolean = false;
    await this.geolocation.getGeolocation().then(s => {
      status = s;
    })
    return status;
  }

  enableBluetooth() {
    this.ble.enable();
  }

  async presentToastConnected(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  Scan() {
    this.devices = [];
    this.ble
      .scan([], 15)
      .subscribe((device) => this.onDeviceDiscovered(device));
  }
  onDeviceDiscovered(device) {
    console.log("Discovered" + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
      if (device.id === this.mac) {
        this.connect();
      }
    });
  }

  

  getAddressSubscription() {
    return this.geolocation.getAddressSubscription();
  }

  connect() {
        this.ble.connect(this.mac).subscribe((data) => {
          this.OnConnectionSuccesfull(data);
        })
  }

  OnConnectionSuccesfull(data: any) {
    this.message();
    this.ble.startNotification(data.id, serv, char).subscribe(
      (res) => {
        this.onDataChanged(res);
      },
      (err) => this.presentToastConnected(err)
    );
  }

  onDataChanged(res: ArrayBuffer) {
    var value = new Uint8Array(res);
    if (value[0] != 10 && this.num != 4) {
      this.stringa[this.num] = String.fromCharCode(value[0]);
      this.num++;
    } else if (this.num == 4 || value[0] == 10) {
      this.num = 0;
      this.ble.disconnect(this.mac).then(() => {
        this.decodeString();
      });
    }
  }

  decodeString(): void{
    for (let index = 0; index < this.stringa.length; index++) {
      if (index != 0) {
        if (this.stringa[index-1] == 'p') {
          this.setPlasticStatus(this.stringa[index]);
        } else if (this.stringa[index-1] == 'c') {
          this.setPaperStatus(this.stringa[index]);
        }
      }      
    }
  } 

  sendMessage() {
    this.ble.isConnected(this.mac).then(
      () => {
        this.message();
      },
      () => {
        this.Scan();
      }
    );
  }

  message() {
    var data = new Uint8Array(1);
    data[0] = 111;
    this.ble.write(this.mac, serv, char, data.buffer).then(() => {
      console.log("hello arduino");
    });
  }

  public setPaperStatus(status: number) {
    this.PAPERSTATUSSUBJECT.next(status);
  }

  public setPlasticStatus(status: number){
    this.PLASTICSTATUSSUBJECT.next(status);
  }

  public getPaperStatus(): Observable<number> {
    return this.PAPERSTATUSSUBJECT.asObservable();
  }

  public getPlasticStatus(): Observable<number> {
    return this.PLASTICSTATUSSUBJECT.asObservable();
  }
}
