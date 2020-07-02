import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PokedexComponent],
  imports: [
    CommonModule,
    SharedModule,
    PokedexRoutingModule
  ]
})
export class PokedexModule { }
