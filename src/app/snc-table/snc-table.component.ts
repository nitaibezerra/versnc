import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

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
  private limit;
  private pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public getEntesFederados(event?: PageEvent) {
    const count: Number = 0;
    let index = 0;

    if (event != null) {
      index = event.pageIndex;
    }

     this.slcapi.getLimitAll().subscribe(
      limit => {
        this.slcapi.search(index * 10, limit.count).subscribe(
          data => {
            this.sncDataSource = new MatTableDataSource<Entidade>(data['entesFederados']);
            this.count = data['count'];
            this.sncDataSource.paginator = this.paginator;
            this.sncDataSource.filteredData = this.sncDataSource.filteredData.sort((t1, t2) => {
              if (t1.id > t2.id) {return -1; }
              if (t1.id < t2.id) {return 1; }
              return 0;
            });
          }
        );
      });


  }

  constructor(private slcapi: SlcApiService) {
  }

  ngAfterViewInit() {
    this.getEntesFederados();
  }

  ngOnInit() {
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
