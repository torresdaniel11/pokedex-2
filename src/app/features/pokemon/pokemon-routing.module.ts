import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonComponent } from './components/pokemon/pokemon.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pokedex',
    pathMatch: 'full'
  },
  {
    path: ':pokemonId',
    component: PokemonComponent,
  },
  {
    path: '**',
    redirectTo: '/pokedex',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
