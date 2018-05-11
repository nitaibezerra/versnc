import {ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';
import {Entidade} from '../models/entidade.model';
import {SlcApiService} from '../slc-api.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {SncTableComponent} from '../snc-table/snc-table.component';

@Component({
  selector: 'snc-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css'],
  providers: [SncTableComponent]
})

export class BuscaComponent implements OnInit {

  listaRetorno = {};
  listaEntidades: [Entidade];

  carregandoDados: Boolean = false;
  taxaDuracaoCarregamento = 0;

  // Paginacao
  offsetAtual = 0;
  numeroDeItems: number;
  totalDeItems: number;
  maximoBotoes = 4;
  opcoesDePaginacao = [12, 24, 48, 100];
  paginaAtual = 1;
  paginaAnterior = 0;

  constructor(private slcApiService: SlcApiService, private location: Location, private router: Router, private sncTable: SncTableComponent) {
  }

  private termoSimples: String = '';


  queries: { [query: string]: String }
    = {'limit': '', 'offset': '', 'nome_municipio': '', 'estado_sigla': '', 'cnpj_prefeitura': ''};

  ngOnInit(): void {
    this.slcApiService.buscaAtual.subscribe(listaRetorno => this.listaRetorno = listaRetorno);
  }

  /* AQUI COMEÇA O TESTE DE REFATORAÇÃO DA BUSCA */

  onRealizarBuscaComEnter(event) {

    if (event.keyCode === 13) {
      if (this.termoSimples.length < 3) {
        this.queries['nome_municipio'] = '';
        this.queries['estado_sigla'] = this.termoSimples.toUpperCase();
      } else if( this.termoSimples === '' || this.termoSimples.length > 2 ){
        this.queries['estado_sigla'] = '';
        this.queries['nome_municipio'] = this.termoSimples;
      }
      this.onRealizarBusca();
    }
  }

  onRealizarBusca() {
    this.listaEntidades = undefined;

    this.carregarPagina(1);
  }

  onTrocaPagina(indice: number) {
    this.carregarPagina(indice);
  }

  carregarPagina(indice: number) {
    console.info(this.queries);
    this.carregandoDados = true;
    this.slcApiService.searchFilter(this.queries).subscribe(
      resposta => {
        this.slcApiService.trocaBusca([resposta['count'], resposta['entesFederados']]);
        this.router.navigate(['/tabela-uf-municipio']);
      });
  }
}
