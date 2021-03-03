import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-vertical-container',
  templateUrl: './vertical-container.component.html',
  styleUrls: ['./vertical-container.component.css']
})
export class VerticalContainerComponent implements OnInit {

  // @Input()
  title:string = "Mis peliculas";

  @Input()
  films:Film[] = [];

  @Input()
  favFilms:Film[] = [];

  titleInput:string = "";

  imgInput = null;

  isAddingFilm:boolean = false;

  isRemovingFilm:boolean = false;

  constructor(public apiService:ApiService, public loginService:LoginService) {  
    this.apiService.refreshFavFilms();

  }

  ngOnInit(): void {
    console.log(this.films)
    console.log(this.favFilms)
    // console.log('asdadasdasdalkdjasñdk')
    // setTimeout( () => {
    //   console.log(this.films)
    //   console.log(this.favFilms)
    //   this.films.forEach( x => {
    //     console.log(this.favFilms.includes(x))
    //   })
    // },2000)
  }

  

  showForm(){
    this.isAddingFilm = !this.isAddingFilm;
  }

  setImg(event){
    // console.log(event.target.files[0])
    if (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpg' || event.target.files[0].type == 'image/jpeg') {
      this.imgInput = event.target.files[0];
    }else{
      console.log('Img type not allowed');
    }
  }

  autoCompleteTitle(event){
    if (this.titleInput.length == 0) {
      this.titleInput = event.target.files[0].name.split('.').slice(0, -1).join('.');
    }
  }

  addFilm(){
    if(this.titleInput.length > 0 && this.imgInput != null){
      // let ref:string = this.storageService.imgPath + this.imgInput.name;
      let name = this.titleInput;
      let image = this.imgInput;

      this.apiService.uploadFilm({
        name,
        image
      }).subscribe( res => {
        this.apiService.refreshFilms();
      })

      this.imgInput = null;
      this.titleInput = "";
      this.isAddingFilm = false;
    }else{
      alert(`Failed to upload film, please be aware of: 
        - Title can't be empty
        - A img (.png , .jpg, .jpeg) is neccesary`)
    }

  }

  removeFilm(film:Film){
    if (this.isRemovingFilm) {

      // If the film is fav, first unfav it from user's fav list and then delete it
      // if (film.isFav) {
        this.apiService.unfavFilm(film)
        .then( x => x.subscribe());
      // }

      this.apiService.deleteFilm(film._id).subscribe( res => {
        console.log(res)
      })

      this.isRemovingFilm = false;
    }
  }

}
