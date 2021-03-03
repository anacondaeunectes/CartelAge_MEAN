import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
// import { logIn, changeLogInHandler } from '../../../assets/javascript/test';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public menu_isVisible:boolean = false;

  constructor(public loginService:LoginService) { }

  ngOnInit(): void {

  }

  logIn(){
    console.log('Iniciando sesión');
  }

  async logOut(){
    this.loginService.logOut();
    this.toggleDropdownButton();
  }

  toggleDropdownButton(){

    if (this.menu_isVisible) {
        document.getElementById("header__LoginDropdownMenu").style.display = "none";
    } else {
        document.getElementById("header__LoginDropdownMenu").style.display = "block";
    }

    this.menu_isVisible = !this.menu_isVisible;
  }

}
