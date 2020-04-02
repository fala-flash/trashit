import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Router } from "@angular/router";

import { BLE } from '@ionic-native/ble';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private router: Router,
    private ble: BLE
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //Here we will check if the user is already logged in
      //because we don't want to ask users to log in each time they open the app
      this.nativeStorage.getItem("google_user").then(
        data => {
          // user is previously logged and we have his data
          // we will let him access the app
          this.router.navigate(["/tabs/tab1"]);
          this.splashScreen.hide();
          

          //auto connect smartphone with iBean on Arduino Board
          this.ble.autoConnect('9C:1D:58:90:C2:AA', this.onConnected.bind(this), this.onDisconnected.bind(this) );

          
        },
        error => {
          this.router.navigate(["/login"]);
          this.splashScreen.hide();
        }
      );
      this.statusBar.styleLightContent();
    });
  }


  //callback executed on connection
  onConnected(){
    let data = new Uint8Array(1);
    data[0] = 70;
    this.ble.write('9C:1D:58:90:C2:AA', 'FFE0', 'FFE1', data.buffer )
  }

  //callback executed on disconnection
  onDisconnected(){
    console.log('Device Disconnected');
  }
}
