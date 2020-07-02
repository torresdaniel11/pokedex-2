import { ACTIONS } from '@enums/actions.enum';
import { AppState } from '@interfaces/appState';
import { Pokemon } from '@interfaces/pokemon';
import { PokemonType } from '@interfaces/pokemon-type';
import * as pokemonActions from '@actions/pokedex.action';

export const initialState = {
  pokemons: [],
  filteredPokemons: [],
};

export function pokedexReducer(
  state: AppState = initialState,
  action: pokemonActions.AddPokemonBatch
) {
  switch (action.type) {
    case ACTIONS.POKEDEX_BATCH:
      const appendData = [...state.pokemons, ...action.payload];

      return {
        ...state,
        pokemons: appendData,
        filteredPokemons: appendData,
      };
    case ACTIONS.POKEMON_LOAD:
      const newList = [...action.payload];

      return {
        ...state,
        pokemons: newList,
        filteredPokemons: newList,
      };
    case ACTIONS.POKEMON_SEARCH:
      const re = new RegExp(action.payload, 'g');
      const filteredData = state.pokemons.filter((pokemon: Pokemon) => {
        if (pokemon.name.match(re)) {
          return true;
        }

        return pokemon.types.some((type: PokemonType) => type.type.name.match(re));
      });

      return {
        ...state,
        pokemons: state.pokemons,
        filteredPokemons: filteredData,
      };
    default:
      return state;
  }
}
