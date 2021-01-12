import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public recentMovies: Movie[];
  public popularMovies: Movie[];

  constructor(
    private movieService: MoviesService
  ) {}

  public ngOnInit(): void {
    this.recentMovies = [];
    this.movieService.retrieveFeature()
      .subscribe(movies => {
        this.recentMovies = movies.results;
      });

    this.popularMovies = [];
    this.loadPopular();
  }

  public loadMore(): void {
    this.loadPopular();
  }

  private loadPopular(): void {
    this.movieService.retrievePopular()
      .subscribe(movies => {

        const arrTemp = [ ...this.popularMovies, ...movies.results ]; 
        this.popularMovies = arrTemp;
      });
  }

}
