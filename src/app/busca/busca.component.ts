import { Component, OnInit } from '@angular/core';
import {Entidade} from '../models/entidade.model';
import {SlcApiService} from '../slc-api.service';
import {SncTableComponent} from '../snc-table/snc-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  private termoSimples: String = '';
  private page: number = 0;

  constructor(private slcApiService: SlcApiService) {
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
          this.queries['offset'] = '';
          this.queries['estado_sigla'] = this.termoSimples.toUpperCase();
        } else if (this.termoSimples === '' || this.termoSimples.length > 2) {
          this.queries['estado_sigla'] = '';
          this.queries['offset'] = '';
          this.queries['nome_municipio'] = this.termoSimples;

        }
        this.onRealizarBusca();
      } else {
        this.queries['offset'] = '';
        this.queries['estado_sigla'] = this.queries['estado_sigla'].toUpperCase();
        this.onRealizarBusca();
      }

    }
  }

  onRealizarBusca() {
    this.listaEntidades = undefined;
    this.slcApiService.carregarPagina(this.page, this.queries);
  }

}
