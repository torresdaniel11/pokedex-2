import { Action } from '@ngrx/store';
import { ACTIONS } from '../enums/actions.enum';
import { Pokemon } from '../interfaces/pokemon';

export class AddPokemons implements Action {
  readonly type = ACTIONS.POKEDEX_BATCH;

  constructor(public payload: Pokemon[]) {}
}

export class LoadPokemons implements Action {
  readonly type = ACTIONS.POKEMON_LOAD;

  constructor(public payload: Pokemon[]) {}
}

export class FilterPokemons implements Action {
  readonly type = ACTIONS.POKEMON_SEARCH;

  constructor(public payload: string) {}
}


export type AddPokemonBatch = AddPokemons | LoadPokemons | FilterPokemons;
