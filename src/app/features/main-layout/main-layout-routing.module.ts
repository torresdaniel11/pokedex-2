import { LayoutComponent } from './components/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        {
          path: '',
          redirectTo: 'pokedex',
          pathMatch: 'full',
        },
        {
          path: 'pokedex',
          loadChildren: () => import('../pokedex/pokedex.module').then((m) => m.PokedexModule),
        },
        {
          path: 'pokemon',
          loadChildren: () => import('../pokemon/pokemon.module').then((m) => m.PokemonModule),
        },
        {
          path: 'profile',
          loadChildren: () => import('../profile/profile.module').then((m) => m.ProfileModule),
        },
        {
          path: '**',
          redirectTo: '/pokedex',
        },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
