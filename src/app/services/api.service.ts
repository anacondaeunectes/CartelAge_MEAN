import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{

  /**
   * Array of films stored on DB. This property is going to be readed by components via @Input decorator
   */
  films:Film[] = [];

  /**
   * Array of user's fav films. This property is going to be readed by components via @Input decorator 
   */
  favFilms:Film[] = [];

  // DB uri const. If port used by server changes, this property needs to be updated
  readonly DB_URI:string ='http://localhost:3000/api';

  constructor(private http:HttpClient, private loginService: LoginService) { 
    this.refreshFilms();
   }

  
  ngOnInit(): void {
    this.getFilms().subscribe( res => {
      // console.log(res)
      this.films = res;
    })
    
  }
  
  /**
   * Refresh favFilms array property. Used when changes on DB are made in order to live update info.
   */
  refreshFavFilms(){

    let tempFilm:Film;

    if (this.loginService.user) {

      // console.log(this.loginService.user.favRefs)
      // console.log(this.films)

      // Clear arrays of fav films
      this.favFilms = [];
      
      //  Loop that compare user's fav references with the films array in order to get the fav films
      this.loginService.user.favRefs.forEach( ref => {
          
        if (!this.favFilms.find(fav => fav._id == ref )) {

          tempFilm = this.films.find( film => film._id == ref)
          if (tempFilm) {
            // console.log(tempFilm)
            this.favFilms.push(tempFilm)
          }
        }
      })
    }

    // console.log('FAV FILM REFRESH: ', this.favFilms)
  }

  /**
   * Refresh films array property. Used when changes on DB are made in order to live update info.
   */
  async refreshFilms(){
    await this.getFilms().toPromise()
    .then( res => {
      this.films = res
    })
  }

  /**
   * API request to get all films
   */
  getFilms(){
    return this.http.get<Film[]>(this.DB_URI + '/film/');
  }

  /**
   * API request to get a film object
   * @param id Id of film to request
   */
  getFilm(id:string){
    return this.http.get<Film>(this.DB_URI + '/film/' + id);
  }

  /**
   * Uploads a new film object to DB
   * @param param0 Desctructured new film data to store a new record on DB:
   *  - name: name of the new film
   *  - image: image path of the new fim
   */
  uploadFilm({name, image}){
    // Allows to send a form-data object
    const fd = new  FormData();
    fd.append('name', name);
    fd.append('image', image);
    return this.http.post(this.DB_URI + '/photo', fd);
  }

  /**
   * Removes film from DB by it's ID
   * @param id Id of film to be deleted 
   */
  deleteFilm(id:String){
    //Removes film from film array
    this.films.splice(this.films.findIndex(x => x._id == id), 1);
    return this.http.delete(this.DB_URI + '/film/' + id);
  }

  /**
   * Add a film id to user's fav list
   * @param param0 Destructured film to set as fav:
   *  - _id: Id of the film
   */
  async favFilm({ _id }){

    return this.http.put(this.DB_URI + '/user/fav/' + this.loginService.user._id , {new: _id});;
  }

  /**
   * Removes a film id from user's fav list
   * @param param0 Destructured film to unset as fav:
   *  - _id: Id of the film
   */
  async unfavFilm({ _id }){

    return this.http.put(this.DB_URI + '/user/unfav/' + this.loginService.user._id , {toRemove: _id});
  }

  /**
   * Removes a film id from ALL USERS'S fav list
   * @param param0 Destructured film to unset as fav on all users:
   *  - _id: Id of the film
   */
  async unfavFilmToAllUsers({_id}){
    return this.http.put(this.DB_URI + '/user/unfav', {toRemove: _id});
  }
  
}
