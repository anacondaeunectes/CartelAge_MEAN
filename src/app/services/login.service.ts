import { Injectable, NgZone } from '@angular/core';

declare function signOut();

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: any;

  constructor(private zone:NgZone) { 
    window['angularComponentReference'] = {
      zone: this.zone,
      component: this,
      onSignInHandler: (value) => this.loadUserInfo(value),
    };
  }


  logOut() {
    this.clearUserInfo();

    // [Temporaly workaround] Makes the web to reload to force google sign-in button appear. Google sing-in button doesnt appear even when the DOM seems to load it :(  
    location.reload();
    signOut();
  }

  loadUserInfo(userInfo: any){
    this.user = userInfo;
  }

  clearUserInfo(){
    this.user = null;
  }
}
