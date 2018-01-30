import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SlcApiService {

  constructor(private http: HttpClient) {  }

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
          let entes_federados: EnteFederado[] = [];
          count = data['count'];
          entes_federados = data['_embedded']['items'].map((element) => {
            const localizacao: Localizacao = {'cidade': '', 'uf': ''};
            const componente: PlanoTrabalho = {'plano_cultura': 'Não existe', 'lei_sistema_cultura': 'Não existe',
                                              'fundo_cultura': 'Não existe', 'conselho_cultural': 'Não existe',
                                              'orgao_gestor': 'Não existe'};
            const ente_federado: EnteFederado = {'localizacao': null, 'plano_trabalho': null};

            localizacao.uf = String(element['ente_federado']['localizacao']['estado']['sigla']);

            if (element['ente_federado']['localizacao']['cidade'] !== null) {
              localizacao.cidade = String(element['ente_federado']['localizacao']['cidade']['nome_municipio']);
            }

            if (element['_embedded']['acoes_plano_trabalho'] !== null) {
              try {
                componente.plano_cultura = String(
                  element['_embedded']['acoes_plano_trabalho']['criacao_plano_cultura']['situacao']);

                componente.lei_sistema_cultura = String(
                  element['_embedded']['acoes_plano_trabalho']['criacao_lei_sistema_cultura']['situacao']);

                componente.fundo_cultura = String(
                  element['_embedded']['acoes_plano_trabalho']['criacao_fundo_cultura']['situacao']);

                componente.orgao_gestor = String(
                  element['_embedded']['acoes_plano_trabalho']['criacao_orgao_gestor']['situacao']);

                componente.conselho_cultural = String(
                  element['_embedded']['acoes_plano_trabalho']['criacao_conselho_cultural']['situacao']);
              }
              catch (error) {
              }
            }

            ente_federado.localizacao = localizacao;
            ente_federado.plano_trabalho = componente;

            return ente_federado;
          });
        return {entes_federados, count};
      }
    );
  }
}

export interface Localizacao {
  cidade: string;
  uf: string;
}

export interface PlanoTrabalho {
  plano_cultura: string;
  lei_sistema_cultura: string;
  fundo_cultura: string;
  conselho_cultural: string;
  orgao_gestor: string;
}

export interface EnteFederado {
  localizacao: Localizacao;
  plano_trabalho: PlanoTrabalho;
}
