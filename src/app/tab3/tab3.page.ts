import { Component, OnInit } from '@angular/core';
import { Genre, MovieDetail } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public movies: MovieDetail[] = [];
  public genres: Genre[] = [];

  public moviesByGenre: {
    genre?: string,
    movies?: MovieDetail[]
  }[] = [];

  constructor(
    private dataLocalService: DataLocalService,
    private moviesService: MoviesService
  ) {}

  public async ionViewWillEnter() {
    this.genres = await this.moviesService.retrieveGenres();

    this.movies = await this.dataLocalService.retrieveStorageMovies();

    this.reorderMovies(this.movies, this.genres);
  }

  private reorderMovies(movies: MovieDetail[], genres: Genre[]): void {

    this.genres.forEach(filterGenre => {

      const moviesFiltered = this.movies.filter(movieDB => movieDB.genres.some(movieGenre => movieGenre.id === filterGenre.id));

      if (moviesFiltered && moviesFiltered.length > 0) {
        this.moviesByGenre.push({
          genre: filterGenre.name,
          movies: moviesFiltered
        });
      }
    });
  }

}
