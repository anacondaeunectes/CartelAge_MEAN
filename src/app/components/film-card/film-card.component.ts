import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit, OnChanges {

  @Input()
  film:Film;

  @Input()
  favFilms:String[];

  constructor(private apiService:ApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('1: ', changes.favFilms)
    console.log('2:', this.favFilms)
    if (changes.favFilms && this.favFilms.length > 0) {

      if(this.favFilms.includes(this.film._id)){
        this.film.isFav = true;
      }
    }
  }

  ngOnInit(): void {
    // setInterval( () => console.log(this.favFilms), 2000)
  }



  switchFav(){

    if (!this.film.isFav) {

      this.apiService.favFilm(this.film).subscribe( res => {
        console.log(res);
        this.film.isFav = true;
      })

      // this.film.isFav = !this.film.isFav;
    } else {
      
      this.apiService.unfavFilm(this.film).subscribe( res => {
        console.log(res);
        this.film.isFav = false;
      })
    }
    
  
    // console.log(this.film.isFav);
  }

}
