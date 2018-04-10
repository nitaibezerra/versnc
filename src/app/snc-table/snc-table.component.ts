import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';

import { SlcApiService } from '../slc-api.service';

@Component({
  selector: 'snc-table',
  templateUrl: './snc-table.component.html',
  styleUrls: ['./snc-table.component.css']
})
export class SncTableComponent implements OnInit {
  panelOpenState: boolean = false;
  private sncDataSource: any;
  private count: Number;
  private entidades: Entidade[] = [];

  private pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public getEntesFederados(event?: PageEvent) {

    let count: Number = 0;
    let index = 0;

    const nomeMunicipio: String = '';
    const uf: String = '';
    const cnpjPrefeitura: String = '';


    if (event != null) {
      index = event.pageIndex;
    }

    this.slcapi.search(index * 10, count, nomeMunicipio, uf, cnpjPrefeitura).subscribe(
      data => {
        this.entidades = data['entesFederados'] as Entidade[];
       //this.sncDataSource = new MatTableDataSource<Entidade>(data['entesFederados'] as Entidade[]);
        console.info(this.entidades);
        this.count = data['count'];
      });
  }

  constructor(private slcapi: SlcApiService) {
  }

  ngOnInit() {
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
  criacao_lei_sistema: string;
  criacao_conselho_cultural: string;
  criacao_orgao_gestor: string;
  criacao_fundo_cultura: string;
  criacao_plano_cultura: string;
  
}
