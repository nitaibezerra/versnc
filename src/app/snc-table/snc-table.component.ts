import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';

import { SlcApiService } from '../slc-api.service';

@Component({
  selector: 'snc-table',
  templateUrl: './snc-table.component.html',
  styleUrls: ['./snc-table.component.css']
})
export class SncTableComponent implements OnInit {

  private sncDataSource: any;
  private count: Number;

  private pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public getServerData(event?: PageEvent) {
    //console.info(this.paginator + '- Paginator!');

    const count: Number = 0;
    let index = 0;

    //console.info(index + '- Index!');

    if (event != null) {
      index = event.pageIndex;
    }
    this.slcapi.get(index * 10).subscribe(
      data => {
        this.sncDataSource = new MatTableDataSource<Localizacao>(data['localizacoes']);
        this.count = data['count'];
        this.sncDataSource.paginator = this.paginator;
      }
    );
  }

  public getEntesFederados(event?: PageEvent) {
    const count: Number = 0;
    let index = 0;

    if (event != null) {
      index = event.pageIndex;
    }
    this.slcapi.search(index * 10).subscribe(
      data => {
        this.sncDataSource = new MatTableDataSource<Entidade>(data['entesFederados']);
        this.count = data['count'];
        this.sncDataSource.paginator = this.paginator;
      }
    );
  }

  constructor(private slcapi: SlcApiService) {
  }

  ngOnInit() {
    // this.getServerData();
    this.getEntesFederados();
  }

}

export interface Localizacao {
  cidade: string;
  uf: string;
}

export interface Entidade {
  id: string;
  ente_federado: string;
  conselho: string;
  situacao_adesao: string;
  acoes_plano_trabalho: string;
  link_entidade: string;
  link_plano_trabalho_entidade: string;
  nome_municipio: string;
}
