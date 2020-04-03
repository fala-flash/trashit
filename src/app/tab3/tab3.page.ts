import { BluetoothService } from './../services/bluetooth.service';

import { Component, OnInit } from "@angular/core";
import {BarcodeScannerOptions, BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { Platform } from "@ionic/angular";


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
     private bluetooth: BluetoothService ) {

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
          if (this.scannedData == '40329574') {
            this.encodeData = "{'basket': 'paper'}";
          } else {
            this.encodeData = "{'basket': 'plastic'}";
          }
          this.bluetooth.Scan();
          return this.encodeData;
        }
    });
  }



}
