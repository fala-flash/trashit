
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from '../environments/environment';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { BLE } from '@ionic-native/ble/ngx';

import { ProductModalPage } from './product-modal/product-modal.page';
import { FormsModule } from '@angular/forms';

// geolocation and native-geocoder
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';


//database
import { HttpClientModule } from '@angular/common/http';
import { DatabaseService } from './services/database.service';

@NgModule({
  declarations: [AppComponent, ProductModalPage],
  entryComponents: [ProductModalPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, NgxQRCodeModule, FormsModule,
  HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    NativeStorage,
    BarcodeScanner,
    BLE,
    Geolocation,
    NativeGeocoder,
    DatabaseService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
