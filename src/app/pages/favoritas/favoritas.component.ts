import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-favoritas',
  templateUrl: './favoritas.component.html',
  styleUrls: ['./favoritas.component.css']
})
export class FavoritasComponent implements OnInit {

  films:Film[];

  constructor(public loginService: LoginService, public apiServicee:ApiService) { }

  ngOnInit(): void {
    this.apiServicee.getFilms().subscribe( res => {
      this.films = res;
    })
  }

}
