import { DatabaseService } from './../services/database.service';
import { GeolocationService } from './../services/geolocation.service';
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


  geoAddress: string = null;

  constructor( private platform: Platform, private barcodeScanner: BarcodeScanner,
     private bluetooth: BluetoothService, public modalCtrl: ModalController,
     private geolocation: GeolocationService,
     private database: DatabaseService ) {

    this.barcodeScannerOptions = {
      prompt: '', // Android
      resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: 'UPC_A, UPC_E, EAN_8	, EAN_13',
      orientation: 'portrait'
    };

  }


  ngOnInit(){
    this.bluetooth.enableBluetooth();
    this.getAddressSubscription();
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
          this.database.getProductTypeByBarcode(this.scannedData).subscribe(material => {
            this.encodeData = `{"basket":"${material['material']}"}`;
            return this.encodeData;
          }, error => {
            if (error.status == 404) {
              this.addProduct(this.scannedData)
            }
          });

          this.bluetooth.sendMessage();
        }
    });
  }


  public async addProduct(barcode){
    var modalPage = await this.modalCtrl.create({component: ProductModalPage, componentProps: {barcodeParams:barcode}});
    modalPage.present();
  }

  getGeolocation() {
    this.geolocation.getGeolocation();
  }

  getAddressSubscription() {
    this.geolocation.getAddressSubscription()
        .subscribe(address => {
          this.geoAddress = address;
        });
  }



}
