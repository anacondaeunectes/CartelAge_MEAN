import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritasComponent } from './pages/favoritas/favoritas.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';

const routes: Routes = [
  {path: 'peliculas', component: PeliculasComponent},
  {path: 'favoritas', component: FavoritasComponent},
  {path: '', redirectTo: '/peliculas', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
