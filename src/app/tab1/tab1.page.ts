
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  user: any = {};
  userReady: boolean = false;

  constructor(
    private auth: AuthService,
    private nativeStorage: NativeStorage) {}

 async ngOnInit() {
    await this.nativeStorage.getItem("google_user").then(data => {
      this.user = {
        name: data.name,
        email: data.email,
        picture: data.picture
      }
      this.userReady = true;
    }, error =>{
      console.log(error);
    })
  }

  exitApp(){
    this.auth.doGoogleLogout();
  }

}
