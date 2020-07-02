import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '@interfaces/appState';
import { NamedAPIResource } from '@interfaces/named-apiresource';
import { POKEAPI_CONSTANTS } from './pokemons.constants';
import * as pokemonActions from '@actions/pokedex.action';

// export { POKEAPI_CONSTANTS };

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  offset: number;

  constructor(private store: Store<AppState>, private http: HttpClient) {
    this.offset = -POKEAPI_CONSTANTS.BATCH_SIZE;
  }

  /**
   * offset < means there are no pokemons in the list
   * request the first batch
   *
   */
  initializePokemonList(): void {
    if (this.offset < 0) {
      this.firstBatch();
    }
  }

  firstBatch(): void {
    this.getPokemons().subscribe((pokemons) => {
      this.store.dispatch(new pokemonActions.LoadPokemons(pokemons));
    });
  }

  setSearch(searchCriteria: string): void {
    this.store.dispatch(new pokemonActions.FilterPokemons(searchCriteria));
  }

  /**
   * request a new pokemon batch and add them to the store
   *
   */
  requestBatch(): void {
    this.getPokemons().subscribe((pokemons) => {
      this.store.dispatch(new pokemonActions.AddPokemons(pokemons));
    });
  }

  /*
    request the pokeapi API a batch of POKEAPI_CONSTANTS.BATCH_SIZE pokemons
    return: the Observable containing the reponse of the HTTP request
  */
  getPokemons(): Observable<any> {
    this.increaseOffset();
    const url = this.buildPokeapiQuery(
      POKEAPI_CONSTANTS.BATCH_SIZE,
      this.offset
    );

    return this.http.get(url).pipe(
      map((result: any) => {
        return this.getPetitionGroup(result.results);
      }),
      switchMap((tasks: Observable<any>[]) => {
        return forkJoin(tasks);
      })
    );
  }

  /**
   * receive an array of namesAPIResource and return the petition observables
   *
   * @param {NamedAPIResource[]} apiResources
   * @returns {Observable<any>[]}
   */
  getPetitionGroup(apiResources: NamedAPIResource[]): Observable<any>[] {
    return apiResources.map((res: NamedAPIResource) =>
      this.getPokemonDetail(res.url)
    );
  }

  getEvolutionPokemons(apiResources: NamedAPIResource[]): Observable<any> {
    const reqs = this.getPetitionGroup(apiResources);

    return forkJoin(reqs);
  }

  /*
  request the pokeapi API the detail of a pokemon based on a url
  @param url: the url of the pokemon detail
  return: the Observable containing the reponse of the HTTP request
  */
  getPokemonDetail(url: string): Observable<any> {
    return this.http.get(url);
  }

  /**
   * build a query to the get pokemons of pokeapi
   *
   * @param {(number | string)} limit
   * @param {(number | string)} offset
   * @returns {string}
   */
  buildPokeapiQuery(limit: number | string, offset: number | string): string {
    const sLimit = limit.toString();
    const sOffset = offset.toString();
    let url = POKEAPI_CONSTANTS.POKEMONS_API;

    url = url.replace('{{SIZE}}', sLimit);
    url = url.replace('{{OFFSET}}', sOffset);

    return url;
  }

  /**
   * increase pokemon offset offset
   *
   * @param {number} [amount=POKEAPI_CONSTANTS.BATCH_SIZE]
   * @returns
   */
  increaseOffset(amount: number = POKEAPI_CONSTANTS.BATCH_SIZE): number {
    this.offset += amount;
    return this.offset;
  }

  getPokemonById(id: number): Observable<any> {
    const url = `${POKEAPI_CONSTANTS.POKEMON_DETAIL_API}${id}`;
    return this.http.get(url);
  }

  getSpecieData(specieURL: string): Observable<any> {
    return this.http.get(specieURL);
  }

  getEvolutionChainData(evolutionChainURL: string): Observable<any> {
    return this.http.get(evolutionChainURL);
  }
}
