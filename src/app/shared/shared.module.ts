import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonTypeComponent } from './components/pokemon-type/pokemon-type.component';

@NgModule({
  declarations: [
    InfiniteScrollDirective,
    PokemonCardComponent,
    PokemonTypeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    InfiniteScrollDirective,
    FormsModule,
    ReactiveFormsModule,
    PokemonCardComponent,
  ],
})
export class SharedModule {}
