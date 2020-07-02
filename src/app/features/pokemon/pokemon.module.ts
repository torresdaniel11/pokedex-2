import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PokemonComponent],
  imports: [
    CommonModule,
    SharedModule,
    PokemonRoutingModule
  ]
})
export class PokemonModule { }
