import { SharedModule } from './../../shared/shared.module';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';



@NgModule({
  declarations: [PokedexComponent, PokemonCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    PokedexRoutingModule
  ]
})
export class PokedexModule { }
