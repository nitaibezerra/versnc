import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Localizacao, Entidade } from './snc-table/snc-table.component';

@Injectable()
export class SlcApiService {

  constructor(private http: HttpClient) { }

  getLimitAll() {
    return this.http.get(
      'http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal/'
      ).map(
        data => {
          const count = data['count'];
          return { count };
        }
      );
  }


  get(offset?) {
    return this.http.get(
      'http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal/',
      {
        params: {
          offset: offset,
        }
      })
      .map(
        data => {
          let count: Number = 0;
          let localizacoes: Localizacao[] = [];
          count = data['count'];
          localizacoes = data['_embedded']['items'].map((element, index) => {
            const localizacao: Localizacao = { 'cidade': '', 'uf': '' };
            localizacao.cidade = String(element['ente_federado']['localizacao']['cidade']['nome_municipio']);
            localizacao.uf = String(element['ente_federado']['localizacao']['estado']['sigla']);
            return localizacao;
          });
          return { localizacoes, count };
        }
      );
  }

  search(offset?, limit?, nomeMunicipio?, uf?, cnpjPrefeitura?) {
    return this.http.get(
      'http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal/',
      {
        params: {
          offset: offset,
          limit: limit,
          nome_municipio: nomeMunicipio,
          estado_sigla: uf,
          cnpj_prefeitura: cnpjPrefeitura,
        }
      }).map(
        data => {
          let count: Number = 0;
          let entesFederados: Entidade[] = [];
          count = data['count'];

          entesFederados = data['_embedded']['items'].map((element, index) => {
            const entidade: Entidade = { 'id': '', 'ente_federado': '', 'situacao_adesao': '', 'conselho': '', 'acoes_plano_trabalho': ''
              , 'link_entidade': '', 'link_plano_trabalho_entidade': '', 'nome_municipio': '', 'criacao_lei_sistema': '', 'criacao_conselho_cultural': ''
              , 'criacao_orgao_gestor': '', 'criacao_fundo_cultura': '', 'criacao_plano_cultura': ''};

            entidade.id = element['id'];
            entidade.ente_federado = element['ente_federado'];

            if (element['situacao_adesao'] !== null) {
              entidade.situacao_adesao = String(element['situacao_adesao']['situacao_adesao']);
            }

            if (element['conselho'] !== null) {
              entidade.conselho = element['conselho'];
            }
            entidade.acoes_plano_trabalho = element['_embedded']['acoes_plano_trabalho'];
            entidade.link_entidade = String(element['_links']['self']['href']);

            if (element['_embedded']['acoes_plano_trabalho'] !==  null){
              entidade.link_plano_trabalho_entidade = String(element['_embedded']['acoes_plano_trabalho']['_links']['self']['href']);

              // entidade.criacao_lei_sistema = String(element['_embedded']['acoes_plano_trabalho']['criacao_lei_sistema']['situacao']);
              // entidade.criacao_conselho_cultural = String(element['_embedded']['acoes_plano_trabalho']['criacao_conselho_cultural']['situacao']);
              // entidade.criacao_plano_cultura = String(element['_embedded']['acoes_plano_trabalho']['criacao_plano_cultura']['situacao']);
              // entidade.criacao_fundo_cultura = String(element['_embedded']['acoes_plano_trabalho']['criacao_fundo_cultura']['situacao']);              
              // entidade.criacao_orgao_gestor = String(element['_embedded']['acoes_plano_trabalho']['criacao_orgao_gestor']['situacao']);                    
                                                       
            }

            if (element['ente_federado']['localizacao']['cidade'] !== null) {
              entidade.nome_municipio = String(element['ente_federado']['localizacao']['cidade']['nome_municipio']);
            }

            return entidade;
          });
          return { entesFederados, count };
        }
      );
  }
}

