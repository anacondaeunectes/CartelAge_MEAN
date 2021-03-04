import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../models/film.model';

@Pipe({
  name: 'getFileExtension'
})
export class GetFileExtensionPipe implements PipeTransform {

  transform(value: Film): string {
    return value.imagePath.split('.')[1];
  }

}
