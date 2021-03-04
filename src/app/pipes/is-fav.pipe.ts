import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../models/film.model';

@Pipe({
  name: 'isFav'
})
export class IsFavPipe implements PipeTransform {

  transform(value: Film, favFilms:Film[]): boolean {
    return favFilms.includes(value);
  }

}
