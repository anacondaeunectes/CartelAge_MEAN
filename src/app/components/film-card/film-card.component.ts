import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {

  @Input()
  film:Film;

  @Input()
  isFav:Boolean;

  constructor(private apiService:ApiService, private loginService:LoginService) { }

  ngOnInit(): void {
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

      this.loginService.refreshFavList();
      this.apiService.refreshFavFilms();

      console.log(this.apiService.favFilms)
      
    } else {
      
      await (await this.apiService.unfavFilm(this.film)).toPromise()
      .then( res => {
        console.log('RES: ', res);
        this.isFav = false;
      })

      await this.loginService.refreshFavList();
      this.apiService.refreshFavFilms();

      console.log(this.apiService.favFilms)

    }
    
  }

}
