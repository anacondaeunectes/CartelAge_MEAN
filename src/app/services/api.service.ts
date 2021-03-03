import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{

  films:Film[] = [];

  readonly DB_URI:string ='http://localhost:3000/api';

  constructor(private http:HttpClient, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getFilms().subscribe( res => {
      console.log(res)
        this.films = res;
      })
  }

  refreshFilms(){
    this.getFilms().subscribe( res => {
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
    return this.http.delete(this.DB_URI + '/film/' + id);
  }

  async favFilm({ _id }){
    console.log('llego')

    const obv = await this.http.put(this.DB_URI + '/user/fav/' + this.loginService.user._id , {new: _id});
    
    this.loginService.refreshFavList();

    return obv;
  }

  async unfavFilm({ _id }){

    const obv = await this.http.put(this.DB_URI + '/user/unfav/' + this.loginService.user._id , {toRemove: _id});

    this.loginService.refreshFavList();

    return obv;
  }
  
}
