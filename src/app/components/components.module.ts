import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  declarations: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetailComponent
  ]
})
export class ComponentsModule { }
