import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-horizontal-container',
  templateUrl: './horizontal-container.component.html',
  styleUrls: ['./horizontal-container.component.css']
})
export class HorizontalContainerComponent implements OnInit {

  /**
   * Container title
   */
  @Input()
  title:string = "Mis favoritas";

  /**
   * Film array with user favs films
   */
  @Input()
  favFilms:Film[] = [];

  constructor(private loginService:LoginService, private apiService:ApiService) { }

   ngOnInit(): void {
    this.loginService.refreshFavList();
    this.apiService.refreshFavFilms();
  }

}
