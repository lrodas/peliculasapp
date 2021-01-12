import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_KEY, URL_MOVIES } from '../config/config';
import { Credits, Genre, MovieDetail, Movies } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularPage: number = 0;
  private genres: Genre[] = [];

  constructor(
    private http: HttpClient
  ) { }

  private runQuery<T>(query: string): Observable<T> {
    query = URL_MOVIES + query;
    query += `&api_key=${API_KEY}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  public retrieveGenres(): Promise<Genre[]> {

    return new Promise( resolve => {
      this.runQuery('/genre/movie/list?a=1')
        .subscribe((genres: any) => {
          this.genres = genres.genres;
          resolve(this.genres);
        });
    });
  }

  public searchMovie(text: string): Observable<Movies> {
    return this.runQuery<Movies>(`/search/movie?query=${text}`);
  }

  public retrieveMovieDetail(id: string): Observable<MovieDetail> {
    return this.runQuery<MovieDetail>(`/movie/${id}?a=1`);
  }

  public retrieveCredits(id: string): Observable<Credits> {
    return this.runQuery<Credits>(`/movie/${id}/credits?a=1`);
  }

  public retrievePopular(): Observable<Movies> {
    this.popularPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularPage}`;
    return this.runQuery<Movies>(query);
  }

  public retrieveFeature(): Observable<Movies> {

    const current_date = new Date();
    const last_day = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0).getDate();
    const month = current_date.getMonth() + 1;
    let monthString;

    if (month < 10) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    const startDate = `${current_date.getFullYear()}-${monthString}-01`;
    const endDate = `${current_date.getFullYear()}-${monthString}-${last_day}`;
    

    return this.runQuery<Movies>(`/discover/movie?primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`);
  }

  
}