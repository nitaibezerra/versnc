import { TestBed, inject, async, fakeAsync } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { SlcApiService } from './slc-api.service';
import { MessageService } from './message.service';
import { Entidade } from './models/entidade.model';
import { Location } from '@angular/common';
import { RouterTestingModule} from '@angular/router/testing';


describe('SlcApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        SlcApiService,
        MessageService,
        Location,
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it('deve retornar o service', inject([SlcApiService], (service: SlcApiService) => {
    expect(service).toBeTruthy();
  }));

  it('service tem o metodo search()', inject([SlcApiService], (service: SlcApiService) => {
    expect(service.searchFilter('')).toBeTruthy();
  }));

  it('retorna um unico elemento da API', (() => {
    const response: Entidade = {
      acoes_plano_trabalho: null,
      conselho: '',
      criacao_conselho_cultural: '',
      criacao_fundo_cultura: '',
      criacao_lei_sistema: '',
      criacao_orgao_gestor: '',
      criacao_plano_cultura: '',
      data_adesao: undefined,
      ente_federado: {
          cnpj_prefeitura: '',
          localizacao: { bairro: '',
                         cep: '',
                         cidade: {codigo_ibge: 170710, nome_municipio: 'Divinópolis do Tocantins'},
                         complemento: '',
                         endereco: '',
                         estado: {codigo_ibge: 17, sigla: 'TO'}
                        },
          telefones: { telefone_um: '', telefone_dois: '', telefone_tres: '' },
          endereco_eletronico: null },
      id: 4456,
      link_entidade: 'http://hmg.snc.cultura.gov.br/api/v1/sistemadeculturalocal/4456.json',
      link_plano_trabalho_entidade: '',
      nome_municipio: 'Divinópolis do Tocantins',
      sigla_estado: 'TO',
      situacao_adesao: '',
    };

    httpClient.get<Entidade>('http://hmg.snc.cultura.gov.br/api/v1/sistemadeculturalocal/')
      .subscribe(data => expect(data).toEqual(response));
    }));
  });
