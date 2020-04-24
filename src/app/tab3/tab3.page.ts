import { BluetoothService } from './../services/bluetooth.service';

import { Component, OnInit } from "@angular/core";
import {BarcodeScannerOptions, BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { Platform } from "@ionic/angular";

import { ModalController } from "@ionic/angular";
import { ProductModalPage } from './../product-modal/product-modal.page';



@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page implements OnInit {

  encodeData: any;
  scannedData: any;
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor( private platform: Platform, private barcodeScanner: BarcodeScanner,
     private bluetooth: BluetoothService, public modalCtrl: ModalController ) {

    this.barcodeScannerOptions = {
      prompt: '', // Android
      resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: 'UPC_A, UPC_E, EAN_8	, EAN_13',
      orientation: 'portrait'
    };

  }


  ngOnInit(){
    this.bluetooth.enableBluetooth();
  }

  scanCode() {
    this.barcodeScanner.scan(this.barcodeScannerOptions).then(barcodeData => {
        if (barcodeData.cancelled) {
          if (this.platform.is('android')) {
            this.platform.backButton.subscribeWithPriority(101, () => {
              event.preventDefault();
            });
          }
        } else {
          this.scannedData = barcodeData.text;


          //va aggiunto il check su db

          //se il prodotto non c'è, bisogna prendere la stringa del barcode e aprire modal di aggiunta


          //nel modal di aggiunta quando premo send va inviato veramente al database
          this.bluetooth.sendMessage();
          return this.encodeData;
        }
    });
  }


  public async addProduct(){
    var modalPage = await this.modalCtrl.create({component: ProductModalPage});
    modalPage.present();
  }

  



}
