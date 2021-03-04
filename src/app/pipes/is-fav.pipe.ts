import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../models/film.model';

@Pipe({
  name: 'isFav'
})
export class IsFavPipe implements PipeTransform {

  /**
   * Return true or false depending on whether the user has that film in his/her fav list
   * @param value film to get whether is fav or not
   * @param favFilms arrays of user's fav films
   */
  transform(value: Film, favFilms:Film[]): boolean {
    return favFilms.includes(value);
  }

}
