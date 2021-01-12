import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MovieDetail } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public movies: MovieDetail[] = [];

  constructor(
    private storage: Storage,
    private taostCtrl: ToastController
  ) {
    this.retrieveStorageMovies();
  }

  public updateStorage(movie: MovieDetail): boolean {

    let message: string;
    let isSaved: boolean;

    if (!this.movies) {
      this.movies = [];
    }

    if (this.movies.find(movieDB => movieDB.id === movie.id)) {
      this.movies = this.movies.filter(movieDB => movieDB.id !== movie.id);
      message = 'La pelicula fue removida de tus favoritos!!!';
      isSaved = false;
    } else {
      this.movies.push(movie);
      message = 'Tu pelicula ha sido guardada!!!';
      isSaved = true;
    }
    
    this.storage.set('movies', this.movies);
    this.showSimpleToast(message);
    return isSaved
  }

  public async retrieveStorageMovies(): Promise<MovieDetail[]> {
    this.movies = await this.storage.get('movies') || [];
    return this.movies;
  }

  public async showSimpleToast(text: string): Promise<void> {
    const toast = await this.taostCtrl.create({
      message: text,
      animated: true,
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  public async movieExist(id: any): Promise<boolean> {
    id = Number(id);

    await this.retrieveStorageMovies()
    
    return (this.movies.find(movieDB => movieDB.id === id) ? true: false);
  }
}
