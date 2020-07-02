import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '@interfaces/appState';
import { Pokemon } from '@interfaces/pokemon';
import { PokemonsService } from '@services/pokemons.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit, OnDestroy {
  pokemons$: Observable<Array<Pokemon>>;
  userInput: string;
  modelChanged: Subject<string> = new Subject<string>();
  inputObservable: Subscription;

  constructor(
    private store: Store<AppState>,
    private pokeService: PokemonsService
  ) {
    this.pokemons$ = this.store.select('pokemons');
    this.subscribeInput();
  }

  ngOnInit(): void {
    this.initializePokemonList();
  }

  ngOnDestroy(): void {
    this.inputObservable.unsubscribe();
  }

  /**
   * create subscription for user input subject
   *
   */
  subscribeInput() {
    this.inputObservable = this.modelChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((userInputValue: string) => {
        console.log(userInputValue);
        this.pokeService.setSearch(userInputValue);
      });
  }

  /**
   * listener for the search field
   *
   * @param {string} text
   */
  searchFieldChanged(text: string) {
    this.modelChanged.next(text);
    // this.pokeService.setSearch(text);
  }

  /**
   * notify service that user open pokedex list
   *
   */
  initializePokemonList() {
    this.pokeService.initializePokemonList();
  }

  /**
   * request a new pokemon batch
   *
   */
  getPokemonBatch(): void {
    this.pokeService.requestBatch();
  }

  /**
   * request a new pokemon batch - triggered by infinite scroll directive
   *
   */
  getMorePokemons() {
    this.getPokemonBatch();
  }
}
