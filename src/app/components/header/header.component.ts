import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /**
   * Property to control when the dropdown log out menu is visible
   */
  public menu_isVisible:boolean = false;

  constructor(public loginService:LoginService) { }

  ngOnInit(): void {

  }

  /**
   * Asynchronous log out
   */
  async logOut(){
    this.loginService.logOut();
    this.toggleDropdownButton();
  }

  /**
   * Changes log out dropdown menu visibility
   */
  toggleDropdownButton(){

    if (this.menu_isVisible) {
        document.getElementById("header__LoginDropdownMenu").style.display = "none";
    } else {
        document.getElementById("header__LoginDropdownMenu").style.display = "block";
    }

    this.menu_isVisible = !this.menu_isVisible;
  }

}
