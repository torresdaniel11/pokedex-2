import { NamedAPIResource } from '@interfaces/named-apiresource';
import { PokemonType } from '@interfaces/pokemon-type';

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: any[];
  forms: any[];
  game_indices: any[];
  held_items: any[];
  location_area_encounters: any[];
  moves: {
    move: NamedAPIResource
  }[];
  species: any[];
  sprites: {
    front_default: string;
    back_default: string;
  };
  stats: NamedAPIResource [];
  types: PokemonType [];
}
