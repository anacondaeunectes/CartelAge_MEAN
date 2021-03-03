import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { VerticalContainerComponent } from './components/vertical-container/vertical-container.component';
import { HorizontalContainerComponent } from './components/horizontal-container/horizontal-container.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilmCardComponent,
    VerticalContainerComponent,
    HorizontalContainerComponent,
    LogInComponent,
    PeliculasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
