import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/interfaces/interfaces';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input()
  public movies: Movie[] = [];

  @Output()
  public loadMore = new EventEmitter();
  
  public slidesOpts = {
    slidesPerView: 3.2,
    freeMode: true,
    spaceBetween: -10
  }

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  public loadMoreMovies(): void {
    this.loadMore.emit();
  }

  public async showDetail(id: string): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
