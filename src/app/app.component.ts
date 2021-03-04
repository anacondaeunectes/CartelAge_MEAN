import { Component, OnInit, NgZone } from '@angular/core';


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
  }

}
