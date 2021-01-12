import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, MovieDetail } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input()
  public id: string = '';
  public hiddenTextQuantity: number = 150;

  public movie: MovieDetail = {};
  public actors: Cast[] = [];
  public inFavorites: string = 'star-outline';

  public slideOptActors = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  public slidesOptGenres = {
    slidesPerView: 4.3,
    freeMode: true,
    spaceBetween: -5
  }; 
  
  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocalService: DataLocalService
  ) { }

  async ngOnInit() {

    this.inFavorites = (await this.dataLocalService.movieExist(this.id) ? this.inFavorites = 'star': 'star-outline');

    this.moviesService.retrieveMovieDetail(this.id)
      .subscribe(resp => {
        this.movie = resp;
      });

    this.moviesService.retrieveCredits(this.id)
      .subscribe(resp => {
        this.actors = resp.cast;
      });
  }

  public back(): void {
    this.modalCtrl.dismiss();
  }

  public favorite(): void {
    const isSaved = this.dataLocalService.updateStorage(this.movie);

    if (isSaved) {
      this.inFavorites = 'star';
    } else {
      this.inFavorites = 'star-outline';
    }
  }

}
