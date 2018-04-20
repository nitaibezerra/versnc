import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { Entidade } from './models/entidade.model';
import { Conditional } from '@angular/compiler';

@Injectable()
export class SlcApiService {

  private sncUrlHmgLocal = 'http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal/';
  private sncUrlLocal = 'http://localhost:8000/api/v1/sistemadeculturalocal';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  search(offset?, limit?, nomeMunicipio?, uf?, cnpjPrefeitura?): Observable<any> {
    return this.http.get<any[]>(
      this.sncUrlHmgLocal,
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
            const entidade: Entidade = {
              'id': '', 'ente_federado': '', 'situacao_adesao': '', 'conselho': '', 'acoes_plano_trabalho': ''
              , 'link_entidade': '', 'link_plano_trabalho_entidade': '', 'nome_municipio': '', 'criacao_lei_sistema': '', 'criacao_conselho_cultural': ''
              , 'criacao_orgao_gestor': '', 'criacao_fundo_cultura': '', 'criacao_plano_cultura': '', 'sigla_estado': '', 'data_adesao': ''
            };

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
            entidade.data_adesao = element['data_adesao'];

            if (element['_embedded']['acoes_plano_trabalho'] !== null) {
              entidade.link_plano_trabalho_entidade = String(element['_embedded']['acoes_plano_trabalho']['_links']['self']['href']);

              // entidade.criacao_lei_sistema = String(element['_embedded']['acoes_plano_trabalho']['criacao_lei_sistema']['situacao']);
              // entidade.criacao_conselho_cultural = String(element['_embedded']['acoes_plano_trabalho']['criacao_conselho_cultural']['situacao']);
              // entidade.criacao_plano_cultura = String(element['_embedded']['acoes_plano_trabalho']['criacao_plano_cultura']['situacao']);
              // entidade.criacao_fundo_cultura = String(element['_embedded']['acoes_plano_trabalho']['criacao_fundo_cultura']['situacao']);              
              // entidade.criacao_orgao_gestor = String(element['_embedded']['acoes_plano_trabalho']['criacao_orgao_gestor']['situacao']);                    

            }

            entidade.sigla_estado = element['ente_federado']['localizacao']['estado']['sigla'];
            if (element['ente_federado']['localizacao']['cidade'] !== null) {
              entidade.nome_municipio = String(element['ente_federado']['localizacao']['cidade']['nome_municipio']);
            }

            return entidade;
          });
          return { entesFederados, count };
        }
      );
  }

  searchFilter(filtro: string): Observable<Entidade[]> {

    console.info(filtro);

    if (!filtro.trim()) {
      // if not search term, return empty Entidade array.
      return of([]);
    }
    return this.http.get<Entidade[]>(this.sncUrlHmgLocal,
      {
        params: {
          nome_municipio: `${filtro}`,
        }
      }
    ).pipe(
      tap(data => {
        let entesFederados: Entidade[] = [];

        entesFederados = data['_embedded']['items'].map((element, index) => {
          const entidade: Entidade = {
            'id': '', 'ente_federado': '', 'situacao_adesao': '', 'conselho': '', 'acoes_plano_trabalho': ''
            , 'link_entidade': '', 'link_plano_trabalho_entidade': '', 'nome_municipio': '', 'criacao_lei_sistema': '', 'criacao_conselho_cultural': ''
            , 'criacao_orgao_gestor': '', 'criacao_fundo_cultura': '', 'criacao_plano_cultura': '', 'sigla_estado': '', 'data_adesao': ''
          };

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
          entidade.data_adesao = element['data_adesao'];

          if (element['_embedded']['acoes_plano_trabalho'] !== null) {
            entidade.link_plano_trabalho_entidade = String(element['_embedded']['acoes_plano_trabalho']['_links']['self']['href']);

            // entidade.criacao_lei_sistema = String(element['_embedded']['acoes_plano_trabalho']['criacao_lei_sistema']['situacao']);
            // entidade.criacao_conselho_cultural = String(element['_embedded']['acoes_plano_trabalho']['criacao_conselho_cultural']['situacao']);
            // entidade.criacao_plano_cultura = String(element['_embedded']['acoes_plano_trabalho']['criacao_plano_cultura']['situacao']);
            // entidade.criacao_fundo_cultura = String(element['_embedded']['acoes_plano_trabalho']['criacao_fundo_cultura']['situacao']);              
            // entidade.criacao_orgao_gestor = String(element['_embedded']['acoes_plano_trabalho']['criacao_orgao_gestor']['situacao']);                    

          }

          entidade.sigla_estado = element['ente_federado']['localizacao']['estado']['sigla'];
          if (element['ente_federado']['localizacao']['cidade'] !== null) {
            entidade.nome_municipio = String(element['ente_federado']['localizacao']['cidade']['nome_municipio']);
          }
          return entidade;
        });
        
        return entesFederados;
    }
      ),
      catchError(this.handleError<Entidade[]>('searchFilter', []))
    );
  }

  // get(offset?) {
  //   return this.http.get(
  //     'http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal/',
  //     {
  //       params: {
  //         offset: offset,
  //       }
  //     })
  //     .map(
  //       data => {
  //         let count: Number = 0;
  //         let localizacoes: Localizacao[] = [];
  //         count = data['count'];
  //         localizacoes = data['_embedded']['items'].map((element, index) => {
  //           const localizacao: Localizacao = { 'cidade': '', 'uf': '' };
  //           localizacao.cidade = String(element['ente_federado']['localizacao']['cidade']['nome_municipio']);
  //           localizacao.uf = String(element['ente_federado']['localizacao']['estado']['sigla']);
  //           return localizacao;
  //         });
  //         return { localizacoes, count };
  //       }
  //     );
  // }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('slc-api.service: ' + message);
  }

}

