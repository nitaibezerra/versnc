import { Component, OnInit } from '@angular/core';
import { Entidade } from '../models/entidade.model';
import { SlcApiService } from '../slc-api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'snc-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})

export class BuscaComponent implements OnInit {
  listaEntidades: [Entidade];

  // Paginacao
  offsetAtual = 0;
  numeroDeItems: number;
  totalDeItems: number;
  maximoBotoes = 4;
  opcoesDePaginacao = [12, 24, 48, 100 ];
  paginaAtual = 1;
  paginaAnterior = 0;


  constructor(private slcApiService: SlcApiService, private location: Location) { }

  queriesDeEntidades: { [query: string]: String }
    = { 'limit': '', 'offset': '', 'nome_municipio?': '', 'estado_sigla?': '', 'cnpj_prefeitura?': '' };


  ngOnInit(): void { }


  /* AQUI COMEÇA O TESTE DE REFATORAÇÃO DA BUSCA */


  onRealizarBuscaComEnter(event) {

    if (event.keyCode === 13) { this.onRealizarBusca(); }
  }

  onRealizarBusca() {

    this.listaEntidades = undefined;

    this.carregarPagina(1);
  }

  onTrocaPagina(indice: number) { this.carregarPagina(indice); }

  carregarPagina(indice: number) {
    const params = new URLSearchParams();

    this.location.go('/tabela-uf-municipio');
          this.slcApiService.searchFilter(this.queriesDeEntidades).subscribe(
            resposta => {
              this.totalDeItems = resposta.total;
              this.numeroDeItems = resposta.count;
              this.listaEntidades = resposta.listaEntidades;
            });

  }

}
