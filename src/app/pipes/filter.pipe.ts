import { Pipe, PipeTransform } from '@angular/core';
import { MovieDetail } from '../interfaces/interfaces';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(movies: MovieDetail[], ...args: unknown[]): unknown {
    
    return movies.filter(movie => movie.backdrop_path);
  }

}
