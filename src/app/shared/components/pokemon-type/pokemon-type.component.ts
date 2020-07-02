import { Component, OnInit, Input } from '@angular/core';

import { PokemonType } from '@interfaces/pokemon-type';

@Component({
  selector: 'app-pokemon-type',
  templateUrl: './pokemon-type.component.html',
  styleUrls: ['./pokemon-type.component.scss']
})
export class PokemonTypeComponent implements OnInit {
  @Input() type: PokemonType;

  constructor() { }

  ngOnInit(): void {
  }
}
