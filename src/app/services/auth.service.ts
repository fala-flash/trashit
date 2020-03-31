import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private googlePlus: GooglePlus,
    private nativeStorage: NativeStorage,
    private router: Router
    ) { }

    async doGoogleLogin(){
    
      this.googlePlus.login({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '406013327564-mk437resim441qmpv4tulht3jjnidmej.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(user =>{
    
        this.nativeStorage.setItem('google_user', {
          name: user.displayName,
          email: user.email,
          picture: user.imageUrl
        })
        .then(() =>{
          this.router.navigate(["/tabs/tab1"]);
        }, error =>{
          console.log(error);
        })
      }, err =>{
        console.log(err)
      });
    }


    doGoogleLogout(){
      this.googlePlus.trySilentLogin({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '406013327564-mk437resim441qmpv4tulht3jjnidmej.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      });
      this.googlePlus.logout()
      .then(res =>{
        //user logged out so we will remove him from the NativeStorage
        this.nativeStorage.remove('google_user');
        this.router.navigate(["/login"]);
      }, err =>{
        console.log(err);
      })
    }


    
}
