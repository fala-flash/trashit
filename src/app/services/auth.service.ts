import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private platform: Platform,
    private google:GooglePlus,
    private fireAuth: AngularFireAuth) { }

    userDetails() {
      return firebase.auth().currentUser;
    }


    async nativeGoogleLogin(): Promise<any> {
      try {
  
        const gplusUser = await this.google.login({
          'webClientId': '406013327564-mk437resim441qmpv4tulht3jjnidmej.apps.googleusercontent.com',
          offline: true
        });
  
        return await this.fireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
  
      } catch (err) {
        console.log(err);
      }
    }

    async webGoogleLogin(): Promise<void> {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.fireAuth.auth.signInWithPopup(provider);
        this.router.navigate(['tabs/tab1']);
      } catch (err) {
        console.log(err);
      }
  
    }

    googleLogin() {
      if (this.platform.is('android')) {
        this.nativeGoogleLogin().then(
          () => this.router.navigate(["tabs/tab1"])
        );
      } else {
        this.webGoogleLogin();
      }
    }


    googleLogout(){
      return new Promise((resolve, reject) => {
        if (this.fireAuth.auth.currentUser) {
          this.google.logout();
          this.fireAuth.auth.signOut()
            .then(() => {
              this.router.navigate(["/login"])
              resolve();
            }).catch((error) => {
              reject();
            });
        }
      });
    }
}
