import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Entidade } from '../models/entidade.model';
import { SlcApiService } from '../slc-api.service';
@Component({
  selector: 'snc-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {
  entidades$: Observable<Entidade[]>;

  private filtros = new Subject<string>();

  constructor(private slcApiService: SlcApiService) { }

  search(filtro: string) {
    this.filtros.next(filtro);
  }

  ngOnInit(): void {
    this.entidades$ = this.filtros.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((filtro: string) => this.slcApiService.searchFilter(filtro))
    );
  }

}
