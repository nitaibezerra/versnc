import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginator, MatTableDataSource, MatSort, MatSelectModule, MatChipsModule, PageEvent } from '@angular/material';

import { SlcApiService } from '../slc-api.service';
import { Entidade } from '../models/entidade.model';
import { BuscaComponent } from '../busca/busca.component';

@Component({
  selector: 'snc-table',
  templateUrl: './snc-table.component.html',
  styleUrls: ['./snc-table.component.css']
})
export class SncTableComponent implements OnInit {

  private count: Number;
  private listaRetorno = {};
  private sncDataSource: any;

  constructor(private slcApiService: SlcApiService) { }
  queries: { [query: string]: String }
    = {'limit': '', 'offset': '', 'nome_municipio': '', 'estado_sigla': '', 'cnpj_prefeitura': ''};

  @ViewChild(MatPaginator, ) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public getEntesFederados(event?: PageEvent): void {

    let index = 0;

    if (event != null) {
      index = event.pageIndex;
    }
    this.slcApiService.buscaAtual.subscribe(listaRetorno => this.listaRetorno = listaRetorno);
    this.sncDataSource = new MatTableDataSource<Entidade>(this.listaRetorno[1] as Entidade[]);
    this.sncDataSource.sort = this.sort;
    this.count = this.listaRetorno[0];

  }

  ngOnInit() {
    this.getEntesFederados();
  }
}
