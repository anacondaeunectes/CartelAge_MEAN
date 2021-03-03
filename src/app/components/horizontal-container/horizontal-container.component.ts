import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-horizontal-container',
  templateUrl: './horizontal-container.component.html',
  styleUrls: ['./horizontal-container.component.css']
})
export class HorizontalContainerComponent implements OnInit, OnChanges {

  @Input()
  title:string = "TITULO";

  @Input()
  films:Film[] = [];

  favFilms:Film[] = [];
  
  @Input()
  favRefs:string[] = [];

  constructor(private loginService:LoginService) { 
   }

   ngOnInit(): void {
    this.loginService.refreshFavList();
  }

   //Its called if any change is made on any class property. So any changes on films, favRefs, etc. trigger this method
  ngOnChanges(changes: SimpleChanges): void {

    console.log('CHANGES: ', changes)

    if(changes.favRefs){

      let tempFilm:Film;

      // console.log(this.films);
      console.log(this.favRefs);

      // compare user favs with every film in order to know which films are the fav ones
      this.favRefs.forEach( ref => {
        
        if (!this.favFilms.find(fav => fav._id == ref )) {
          console.log('llego')
          tempFilm = this.films.find( film => film._id == ref)
          if (tempFilm) {
            console.log(tempFilm)
            tempFilm.isFav = true;
            this.favFilms.push(tempFilm)
          }
        }
      })

    }
    
  }

}
