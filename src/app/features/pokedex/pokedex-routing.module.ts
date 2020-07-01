import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';

const routes: Routes = [
  {
    path: '',
    component: PokedexComponent,
    pathMatch: 'full',
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
export class PokedexRoutingModule {}
