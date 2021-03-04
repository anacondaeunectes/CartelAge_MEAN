import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../models/film.model';

@Pipe({
  name: 'getFileExtension'
})
export class GetFileExtensionPipe implements PipeTransform {

  /**
   * Return extension of image file associated with each film
   * @param value Film to get image extension
   */
  transform(value: Film): string {
    return value.imagePath.split('.')[1];
  }

}
