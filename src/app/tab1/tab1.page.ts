import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  user: any = {}

  constructor(private router: Router,
    private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.userDetails()) {
      this.user = {
        email: this.auth.userDetails().email,
        displayName: this.auth.userDetails().displayName
      }
    }
  }

  exitApp(){
    this.auth.googleLogout();
  }

}
