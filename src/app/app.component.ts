import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from './services/api.service';
import { FilmServiceService } from './services/film-service.service';
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {'(window:custom-event)':'testeo()'}
})
export class AppComponent implements OnInit{
  title = 'CartelAge-MEAN';
  films = [];

  constructor(public filmService: FilmServiceService, private apiService:ApiService, public loginService: LoginService){ }

  ngOnInit(): void {
    // this.loadScript('https://apis.google.com/js/platform.js');
  }

  // public loadScript(url: string) {
  //   const body = document.body as HTMLDivElement;
  //   const script = document.createElement('script');
  //   script.innerHTML = '';
  //   script.src = url;
  //   script.async = false;
  //   script.defer = true;
  //   body.appendChild(script);
  // }

}
