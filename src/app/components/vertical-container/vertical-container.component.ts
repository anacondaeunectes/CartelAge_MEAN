import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-vertical-container',
  templateUrl: './vertical-container.component.html',
  styleUrls: ['./vertical-container.component.css']
})
export class VerticalContainerComponent implements OnInit {

  // @Input()
  title:string = "Mis peliculas";

  /**
   * Film array with all DB films
   */
  @Input()
  films:Film[] = [];

  /**
   * Film array with user favs films
   */
  @Input()
  favFilms:Film[] = [];

  /**
   * Input title property
   */
  titleInput:string = "";

  /**
   * Image input property
   */
  imgInput = null;

  /**
   * Properties to control when the user is adding/removing any film
   */
  isAddingFilm:boolean = false;
  isRemovingFilm:boolean = false;

  constructor(public apiService:ApiService, public loginService:LoginService) {  
    this.apiService.refreshFavFilms();

  }

  ngOnInit(): void {
  }

  /**
   * Show add film from 
   */
  showForm(){
    this.isAddingFilm = !this.isAddingFilm;
  }

  /**
   * Set 'imgInput' property with aa image from File System
   * @param event image choosen from File System
   * 
   * If file type is not allowed, an alert appears
   */
  setImg(event){
    // console.log(event.target.files[0])
    if (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpg' || event.target.files[0].type == 'image/jpeg') {
      this.imgInput = event.target.files[0];
    }else{
      alert('Img type not allowed');
    }
  }

  /**
   * Updates 'titleInput' with name of file selected from the user if no title has been set before
   * @param event image choosen from File System
   */
  autoCompleteTitle(event){
    if (this.titleInput.length == 0) {
      this.titleInput = event.target.files[0].name.split('.').slice(0, -1).join('.');
    }
  }

  /**
   * Makes an API request to add a new film to DB
   */
  addFilm(){
    if(this.titleInput.length > 0 && this.imgInput != null){
      // let ref:string = this.storageService.imgPath + this.imgInput.name;
      let name = this.titleInput;
      let image = this.imgInput;

      this.apiService.uploadFilm({
        name,
        image
      }).subscribe( async res => {
        this.apiService.refreshFilms();
        await this.loginService.refreshFavList();
        this.apiService.refreshFavFilms();
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

  /**
   * Makes API request to remove a film from DB.
   * Also makes another API request to remove film reference from all users fav list 
   * @param film film to be removed
   */
  removeFilm(film:Film){
    if (this.isRemovingFilm) {

      this.apiService.unfavFilmToAllUsers(film)
      .then( x => x.subscribe());


      this.apiService.deleteFilm(film._id).subscribe( res => {
        // console.log(res)
      })

      this.isRemovingFilm = false;
    }
  }

  /**
   * Generates and download a HTML table with films info in PDF format
   */
  generateCanvas(){

    const DATA = document.getElementById('tableToPdf');
      const doc = new jsPDF('p', 'pt', 'a4');
      const options = {
        background: 'white',
        scale: 3
      };
      html2canvas(DATA, options).then((canvas) => {

        const img = canvas.toDataURL('image/PNG');
  
        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
      }).then((docResult) => {
        docResult.save(`${this.loginService.user.name}_CartelAge_Films.pdf`);
      });
  }

  /**
   * Proper method to call in order to download PDF. It changes HTML table display before download it (necessary step). 
   */
  generatePDF(){
    //Its necessary to display briefly the table in order to html2cnavas to work porperly. Tests have been made and the change has not been visible :). 
    document.getElementById('tableToPdf').style.display = 'block';
    this.generateCanvas();
    document.getElementById('tableToPdf').style.display = 'none';
  }

}
