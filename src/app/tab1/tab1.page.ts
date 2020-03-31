import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  user: any = {}

  constructor(private router: Router,
    private auth: AuthService,
    private nativeStorage: NativeStorage) {}

  ngOnInit() {
    this.nativeStorage.getItem("google_user").then(user => {
      this.user.email = user.email;
      this.user.displayName = user.name;
    })
  }

  exitApp(){
    this.auth.doGoogleLogout();
  }

}
