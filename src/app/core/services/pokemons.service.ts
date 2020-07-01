
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { map, switchMap } from 'rxjs/operators';
import { AppState } from '../interfaces/appState';

import * as pokemonActions from '../actions/pokedex.action';
import { POKEAPI_CONSTANTS } from './pokemons.constants';

// export { POKEAPI_CONSTANTS };

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  offset: number;

  constructor(
    private store: Store<AppState>,
    private http: HttpClient
  ) {
    this.offset = -POKEAPI_CONSTANTS.BATCH_SIZE;
  }

  /**
   * offset < means there are no pokemons in the list
   * request the first batch
   *
   */
  initializePokemonList() {
    if (this.offset < 0) {
      this.firstBatch();
    }
  }

  firstBatch() {
    this.getPokemons().subscribe((pokemons) => {
      this.store.dispatch(new pokemonActions.LoadPokemons(pokemons));
    });
  }

  setSearch(searchCriteria: string) {
    this.store.dispatch(new pokemonActions.FilterPokemons(searchCriteria));
  }

  /**
   * request a new pokemon batch and add them to the store
   *
   */
  requestBatch() {
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
        return result.results.map((res) => this.getPokemonDetail(res.url));
      }),
      switchMap((tasks) => {
        return forkJoin(tasks);
      })
    );
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
    console.log(url);
    return url;
  }

  /**
   * increase pokemon offset offset
   *
   * @param {number} [amount=POKEAPI_CONSTANTS.BATCH_SIZE]
   * @returns
   */
  increaseOffset(amount: number = POKEAPI_CONSTANTS.BATCH_SIZE) {
    this.offset += amount;
    return this.offset;
  }
}
