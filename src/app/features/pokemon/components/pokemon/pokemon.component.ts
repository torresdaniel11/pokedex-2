import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { NamedAPIResource } from '@interfaces/named-apiresource';
import { Pokemon } from '@interfaces/pokemon';
import { PokemonsService } from '@services/pokemons.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  pokemonId: number;
  pokemonData: Pokemon;
  evolutions: NamedAPIResource[] = [];
  evolutionPokemons: Pokemon[] = [];

  constructor(
    private pokedex: PokemonsService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.pokemonId = params.pokemonId;
      this.fetchPokemonData();
    });
  }

  ngOnInit() { }

  /**
   * request current pokemon detailed information
   *
   */
  fetchPokemonData(): void {
    this.pokedex.getPokemonById(this.pokemonId).subscribe(data => {
      this.pokemonData = data;
      this.getEvolutionChainData(data.species.url);
    });
  }

  /**
   * given an species URL will bring the pokemons details information
   *
   * @param {string} specieURL
   */
  getEvolutionChainData(specieURL: string) {
    this.evolutions = [];

    this.pokedex.getSpecieData(specieURL).subscribe(data => {
      const evolutionChainURL = data.evolution_chain.url;

      this.pokedex.getEvolutionChainData(evolutionChainURL)
        .subscribe(evolutionData => {
          this.getEvolutionNamedResources(evolutionData.chain, this.evolutions);
          this.setEvolutionPokemons();
        });
    });
  }

  /**
   * will request the name resources pokemon information
   *
   */
  setEvolutionPokemons(){
    this.pokedex.getEvolutionPokemons(this.evolutions).subscribe((pokemons: Pokemon[]) => {
      this.evolutionPokemons = pokemons;
    });
  }

  /**
   * recursirvely add evolution pokemons named api resources to the given array
   *
   * @param {*} data
   * @param {*} array
   */
  getEvolutionNamedResources(data, array): void {
    const newData: NamedAPIResource = {
      name: data.species.name,
      url: data.species.url.replace('-species', '')
    };

    array.push(newData);
    if (data.evolves_to.length) {
      this.getEvolutionNamedResources(data.evolves_to[0], array);
    }
  }
}
