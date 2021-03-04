import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritasComponent } from './pages/favoritas/favoritas.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';

const routes: Routes = [
  {path: 'peliculas', component: PeliculasComponent},
  {path: 'favoritas', component: FavoritasComponent},
  {path: '', redirectTo: '/peliculas', pathMatch: 'full'},
  {path: '**', redirectTo: '/peliculas'} // Redirects to peliculas path if no existing 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
