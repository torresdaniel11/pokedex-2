import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthService } from '@services/auth.service';
import { environment } from '@environments/environment';
import { LocalstorageService } from '@services/localstorage.service';
import { pokedexReducer } from './reducers/pokedex.reducer';
import { PokemonsService } from './services/pokemons.service';

@NgModule({
  declarations: [],
  providers: [
    PokemonsService,
    AuthService,
    LocalstorageService],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    StoreModule.forRoot({
      pokemons: pokedexReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
  ],
})
export class CoreModule {}
