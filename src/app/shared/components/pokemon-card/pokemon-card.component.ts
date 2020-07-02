import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from '@interfaces/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
