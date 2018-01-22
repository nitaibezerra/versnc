import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';

import { SlcApiService } from '../slc-api.service';

@Component({
  selector: 'snc-table',
  templateUrl: './snc-table.component.html',
  styleUrls: ['./snc-table.component.css']
})
export class SncTableComponent implements OnInit {

  private sncDataSource: any;

  constructor(private slcapi: SlcApiService) {
  }

  ngOnInit() {
    this.slcapi.get().subscribe(data => {
      let localizacao = [];
      for (let i in data['_embedded']['items']) {
        localizacao.push(new Localizacao());
        localizacao[i].cidade = String(data['_embedded']['items'][i]['ente_federado']['localizacao']['cidade']['nome_municipio']);
        localizacao[i].uf = String(data['_embedded']['items'][i]['ente_federado']['localizacao']['estado']['sigla']);
      }
      this.sncDataSource = new MatTableDataSource<Localizacao>(localizacao);
    });
  }
}

export class Localizacao {
  cidade: string;
  uf: string;
}
