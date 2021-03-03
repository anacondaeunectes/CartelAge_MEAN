import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare function signOut();

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: any;

  readonly DB_URI:string ='http://localhost:3000/api';

  constructor(private zone:NgZone, private http:HttpClient) { 
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

  async refreshFavList(){
    await this.http.get(this.DB_URI + '/user/' + this.user._id).toPromise()
    .then( res => {
      if (res) {
        console.log('REFRESHED FAV LIST: ', res)
        this.user.favRefs = res;
      }
    })
  }

  loadUserInfo(userInfo: any){
    this.user = userInfo;
  }

  clearUserInfo(){
    this.user = null;
  }
}
