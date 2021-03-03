import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {

  @Input()
  film:Film;

  constructor() { }

  ngOnInit(): void {
  }

  // switchFav(){
  //   if (this.film.isFav) {
  //     // this.dbService.removeFav(this.film.id);
  //     this.film.isFav = !this.film.isFav;
  //   } else {
  //     // this.dbService.addFav(this.film.id);
  //   }
  
  //   // console.log(this.film.isFav);
  // }

}
