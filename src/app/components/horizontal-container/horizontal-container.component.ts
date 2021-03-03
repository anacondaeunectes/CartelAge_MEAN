import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Film } from 'src/app/models/film.model';

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

  constructor() { 
    // setInterval( () => console.log(this.films), 1000)
   }

  ngOnChanges(changes: SimpleChanges): void {

    let tempFilm:Film;

    this.favRefs.forEach( ref => {
      console.log(this.films)
      tempFilm = this.films.find( film => film._id == ref)
      if (tempFilm) {
        tempFilm.isFav = true;
        this.favFilms.push(tempFilm)
      }
    })
  }

  ngOnInit(): void {
    console.log('new')
  }

}
