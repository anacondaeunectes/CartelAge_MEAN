import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit /*, OnChanges*/ {

  @Input()
  film:Film;

  @Input()
  isFav:Boolean;

  // @Input()
  // favFilms:String[];

  constructor(private apiService:ApiService, private loginService:LoginService) { }

  /*ngOnChanges(changes: SimpleChanges): void {
    console.log('1111: ', changes.favFilms)
    console.log('2222:', this.favFilms)
    if (changes.favFilms && this.favFilms.length > 0) {

      if(this.favFilms.includes(this.film._id)){
        this.film.isFav = true;
      }
    }
  }*/

  ngOnInit(): void {
    // console.log(this.apiService.films)
    // console.log(this.apiService.favFilms)
    // console.log(this.film.name, this.isFav)
    // console.log(this.apiService.favFilms.includes(this.film))
    console.log('Film: ', this.film, this.isFav)
    this.check_isFav();
  }

  // This mehtod is a workaround. When a new film is uploaded, the 'isFav' input flow mess up and doesn't reload the @input condicition ([isFav]="this.favFilms.includes(film)").
  check_isFav(){
    if (this.loginService.user) {
      // console.log(this.loginService.user.favRefs)
      this.isFav = this.loginService.user.favRefs.includes(this.film._id) ? true : false;
    }
  }

  async switchFav(){

    if (!this.isFav) {

      await (await this.apiService.favFilm(this.film)).toPromise()
      .then( res => {
        console.log(res);
        this.isFav = true;
      })


      // .then( x => x.subscribe( res => {
      //   console.log(res);
      //   this.isFav = true;
      // }))

      this.loginService.refreshFavList();
      this.apiService.refreshFavFilms();

      console.log(this.apiService.favFilms)
      
      // this.film.isFav = !this.film.isFav;
    } else {
      
      await (await this.apiService.unfavFilm(this.film)).toPromise()
      .then( res => {
        console.log('RES: ', res);
        this.isFav = false;
      })


      // .then( x => x.subscribe( res => {
      //   console.log(res);
      //   this.isFav = false;
      // }))

      await this.loginService.refreshFavList();
      this.apiService.refreshFavFilms();

      console.log(this.apiService.favFilms)

    }
    
  
    // console.log(this.film.isFav);
  }

}
