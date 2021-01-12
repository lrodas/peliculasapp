import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [ImagenPipe, ParesPipe, FilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe,
    ParesPipe,
    FilterPipe
  ]
})
export class PipesModule { }
