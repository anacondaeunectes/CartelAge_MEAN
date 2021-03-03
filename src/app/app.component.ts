import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from './services/api.service';
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {'(window:custom-event)':'testeo()'}
})
export class AppComponent implements OnInit{
  title = 'CartelAge-MEAN';

  constructor(){ }

  ngOnInit(): void {
    // this.loadScript('https://apis.google.com/js/platform.js');
  }

}
