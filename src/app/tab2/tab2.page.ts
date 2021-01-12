import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../components/detail/detail.component';
import { Movie } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public searchText: string;

  public ideas: string[] = ['Spiderman', 'Avenger', 'El señor de los anillos', 'La vida es bella'];
  public movies: Movie[];
  public loading: boolean;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  public ngOnInit(): void {
    this.loading = false;
    this.movies = [];
    this.searchText = '';
  }

  public async showMovieDetail(id: string): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

  public search(event: any): void {
    this.loading = true;
    
    if (event.detail.value.trim() === '') {
      this.movies = [];
      this.loading = false;
      return;
    }
    this.moviesService.searchMovie(event.detail.value)
      .subscribe(movies => {
        this.loading = false;
        this.movies = movies.results;
      });
  }
}
