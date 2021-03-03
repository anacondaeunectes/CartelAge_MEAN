import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{

  films:Film[] = [];

  favFilms:Film[] = [];

  readonly DB_URI:string ='http://localhost:3000/api';

  constructor(private http:HttpClient, private loginService: LoginService) { 
    this.refreshFilms();
   }

  
  ngOnInit(): void {
    this.getFilms().subscribe( res => {
      console.log(res)
      this.films = res;
    })
    
  }
  
  refreshFavFilms(){

    console.log('empiezo')

    let tempFilm:Film;

    if (this.loginService.user) {

      console.log(this.loginService.user.favRefs)
      console.log(this.films)

      // Clear arrays of fav films
      this.favFilms = [];
      
      //  Loop that compare user's fav references with the films array in order to get the fav films
      this.loginService.user.favRefs.forEach( ref => {
          
        if (!this.favFilms.find(fav => fav._id == ref )) {
          console.log('llego')
          tempFilm = this.films.find( film => film._id == ref)
          if (tempFilm) {
            console.log(tempFilm)
            // tempFilm.isFav = true;
            this.favFilms.push(tempFilm)
          }
        }
      })
    }


    console.log('FAV FILM REFRESH: ', this.favFilms)
  }

  async refreshFilms(){
    await this.getFilms().toPromise()
    .then( res => {
      this.films = res
    })
  }

  getFilms(){
    return this.http.get<Film[]>(this.DB_URI + '/film/');
  }

  getFilm(id:string){
    return this.http.get<Film>(this.DB_URI + '/film/' + id);
  }

  uploadFilm({name, image}){
    // Allows to send a form-data object
    const fd = new  FormData();
    fd.append('name', name);
    fd.append('image', image);
    return this.http.post(this.DB_URI + '/photo', fd);
  }

  deleteFilm(id:String){
    this.films.splice(this.films.findIndex(x => x._id == id), 1);
    return this.http.delete(this.DB_URI + '/film/' + id);
  }

  async favFilm({ _id }){
    console.log('llego') 

    return this.http.put(this.DB_URI + '/user/fav/' + this.loginService.user._id , {new: _id});;
  }

  async unfavFilm({ _id }){

    return this.http.put(this.DB_URI + '/user/unfav/' + this.loginService.user._id , {toRemove: _id});
  }
  
}
