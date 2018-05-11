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

  private listaRetorno = {};
  private listaEntidades: [Entidade];
  private seletorTipoBusca: boolean = false;
  private carregandoDados: Boolean = false;
  private taxaDuracaoCarregamento = 0;
  private termoSimples: String = '';

  // Paginacao
  private offsetAtual = 0;
  private numeroDeItems: number;
  private totalDeItems: number;
  private maximoBotoes = 4;
  private opcoesDePaginacao = [5, 10, 25, 50, 100];
  private paginaAtual = 1;
  private paginaAnterior = 0;

  constructor(private slcApiService: SlcApiService,
              private location: Location,
              private router: Router) {
  }

  queries: { [query: string]: String }
    = {'limit': '', 'offset': '', 'nome_municipio': '', 'estado_sigla': '', 'cnpj_prefeitura': ''};

  ngOnInit(): void {
    this.slcApiService.buscaAtual.subscribe(listaRetorno => this.listaRetorno = listaRetorno);
  }

  /* AQUI COMEÇA O TESTE DE REFATORAÇÃO DA BUSCA */

  onRealizarBuscaComEnter(event) {
    if (event.keyCode === 13) {
      if (!this.seletorTipoBusca) {
        if (this.termoSimples.length < 3) {
          this.queries['nome_municipio'] = '';
          this.queries['estado_sigla'] = this.termoSimples.toUpperCase();
        } else if (this.termoSimples === '' || this.termoSimples.length > 2) {
          this.queries['estado_sigla'] = '';
          this.queries['nome_municipio'] = this.termoSimples;
        }
        this.onRealizarBusca();
      } else {
        this.queries['estado_sigla'] = this.queries['estado_sigla'].toUpperCase();
        this.onRealizarBusca();
      }

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
