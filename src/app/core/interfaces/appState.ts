import { Pokemon } from './pokemon';

export interface AppState {
    pokemons: Pokemon[];
    filteredPokemons: Pokemon[];
}
