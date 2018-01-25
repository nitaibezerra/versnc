import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';

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

  public getServerData(event?: PageEvent) {
    let count: Number = 0;
    let index: Number = 0;
    if (event != null) {
      index = event.pageIndex;
    }
    this.slcapi.get(index * 10).map(
      data => {
        let localizacoes: Localizacao[] = [];
        count = data['count'];
        localizacoes = data['_embedded']['items'].map((element, index) => {
          const localizacao: Localizacao = {'cidade': '', 'uf': ''};
          localizacao.cidade = String(element['ente_federado']['localizacao']['cidade']['nome_municipio']);
          localizacao.uf = String(element['ente_federado']['localizacao']['estado']['sigla']);
          return localizacao;
        });

        return {localizacoes, count};
      }
    )
    .subscribe(
      data => {
        this.sncDataSource = new MatTableDataSource<Localizacao>(data['localizacoes']);
        this.count = data['count'];
      }
    );
  }

  constructor(private slcapi: SlcApiService) {
  }

  ngOnInit() {
    this.getServerData();
    // this.slcapi.get().map(
    //   data => {
    //     let localizacoes: Localizacao[] = [];
    //     count = data['count'];
    //     localizacoes = data['_embedded']['items'].map((element, index) => {
    //       const localizacao: Localizacao = {'cidade': '', 'uf': ''};
    //       localizacao.cidade = String(element['ente_federado']['localizacao']['cidade']['nome_municipio']);
    //       localizacao.uf = String(element['ente_federado']['localizacao']['estado']['sigla']);
    //       return localizacao;
    //     });

    //     return {localizacoes, count};
    //   }
    //   // return (count, localizacao);
    // )
    // .subscribe(
    //   data => {
    //     this.sncDataSource = new MatTableDataSource<Localizacao>(data['localizacoes']);
    //     this.count = data['count'];
    //   }
    // );
  }
}

export interface Localizacao {
  cidade: string;
  uf: string;
}
