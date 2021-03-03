import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmServiceService {

  readonly DB_URI:string ='http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  getFilms(){
    return this.http.get<Object[]>(this.DB_URI + '/product');
  }

  getFilm(id:string){
    return this.http.get<Object>(this.DB_URI + '/product/' + id);
  }
  
}
