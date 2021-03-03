import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-horizontal-container',
  templateUrl: './horizontal-container.component.html',
  styleUrls: ['./horizontal-container.component.css']
})
export class HorizontalContainerComponent implements OnInit /*, OnChanges*/ {

  @Input()
  title:string = "TITULO";

  @Input()
  favFilms:Film[] = [];

  constructor(private loginService:LoginService, private apiService:ApiService) { 
   }

   ngOnInit(): void {
    this.loginService.refreshFavList();
    this.apiService.refreshFavFilms();
  }

   //Its called if any change is made on any class property. So any changes on films, favRefs, etc. trigger this method
  // ngOnChanges(changes: SimpleChanges): void {

  //   console.log('CHANGES: ', changes)

  //   if(changes.favRefs){

  //     let tempFilm:Film;

  //     // console.log(this.films);
  //     console.log(this.favRefs);

  //     // compare user favs with every film in order to know which films are the fav ones
  //     this.favRefs.forEach( ref => {
        
  //       if (!this.favFilms.find(fav => fav._id == ref )) {
  //         console.log('llego')
  //         tempFilm = this.films.find( film => film._id == ref)
  //         if (tempFilm) {
  //           console.log(tempFilm)
  //           tempFilm.isFav = true;
  //           this.favFilms.push(tempFilm)
  //         }
  //       }
  //     })

  //   }
    
  // }

}
