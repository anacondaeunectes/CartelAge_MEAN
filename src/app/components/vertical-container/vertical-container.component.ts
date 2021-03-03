import { ChangeDetectorRef } from '@angular/core';
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

  films:Film[] = []

  @Input()
  favFilms:string[];

  titleInput:string = "";

  imgInput = null;

  isAddingFilm:boolean = false;

  isRemovingFilm:boolean = false;

  constructor(public apiService:ApiService, public loginService:LoginService, public crd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getFilms();
    console.log('onInit')
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

  addFilm(){
    if(this.titleInput.length > 0 && this.imgInput != null){
      // let ref:string = this.storageService.imgPath + this.imgInput.name;
      let name = this.titleInput;
      let image = this.imgInput;

      this.apiService.uploadFilm({
        name,
        image
      }).subscribe( res => {
        this.getFilms();
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
      if (film.isFav) {
        this.apiService.unfavFilm(film).subscribe();
      }

      this.apiService.deleteFilm(film._id).subscribe( res => {
        this.getFilms();
      })
      this.isRemovingFilm = false;
    }
  }

  getFilms(){
    this.apiService.getFilms().subscribe( res => {
      this.films = res;
    }) 
  }

}
