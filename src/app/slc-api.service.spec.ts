import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
// import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SlcApiService } from './slc-api.service';
import { MessageService } from './message.service';

describe('SlcApiService', () => {
  let httpMock, service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SlcApiService,
        MessageService,
        // { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  beforeEach(inject([SlcApiService, HttpTestingController], (_service, _httpMock) => {
    service = _service;
    httpMock = _httpMock;
    // mockbackend = _mockbackend;
  }));

  it('deve retornar o service', () => {
    expect(service).toBeTruthy();
  });

  it('service tem o metodo search()', () => {
    expect(service.search()).toBeTruthy();
  });

  it('retorna um unico elemento da API', () => {
    let response = {
      "_embedded": {
        "items": [{
          "governo": {
            "nome_prefeito": "Prefeito do Teste",
            "email_institucional_prefeito": "teste@email.com",
            "termo_posse_prefeito": "/media/termo_posse/Modelo_1mdl3.png"
          },
          "_embedded": {
            "acoes_plano_trabalho": {
              "criacao_fundo_cultura": {
                "cnpj_fundo_cultura": "96.384.155/0001-48",
                "situacao": "Em preenchimento",
                "lei_fundo_cultura": null
              },
              "criacao_orgao_gestor": {
                "relatorio_atividade_secretaria": null,
                "situacao": "Em preenchimento"
              },
              "_links": {
                "self": {
                  "href": "http://snchomolog.cultura.gov.br/api/v1/acoesplanotrabalho/6183/?format=json"
                }
              },
              "id": 6183,
              "criacao_conselho_cultural": {
                "situacao": "Em preenchimento",
                "ata_regimento_aprovado": null
              },
              "criacao_lei_sistema_cultura": {
                "lei_sistema_cultura": null,
                "situacao": "Em preenchimento"
              },
              "_embedded": {
                "sistema_cultura_local": {
                  "_links": {
                    "self": {
                      "href": "http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal/4465/?format=json"
                    }
                  }
                }
              },
              "criacao_plano_cultura": {
                "lei_plano_cultura": null,
                "minuta_preparada": null,
                "ata_reuniao_aprovacao_plano": null,
                "situacao": "Em preenchimento",
                "ata_votacao_projeto_lei": null,
                "relatorio_diretrizes_aprovadas": null
              }
            }
          },
          "situacao_adesao": {
            "situacao_adesao": "Publicado no DOU"
          },
          "conselho": {
            "conselheiros": [
              {
                "nome": "TEste 123",
                "email": "teste@email.com",
                "data_situacao": "2018-03-29",
                "segmento": "Circo",
                "situacao": "1",
                "data_cadastro": "2018-03-29"
              }
            ]
          },
          "_links": {
            "self": {
              "href": "http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal/4465/?format=json"
            }
          },
          "id": 4465,
          "ente_federado": {
            "cnpj_prefeitura": "66.537.377/0001-92",
            "localizacao": {
              "estado": {
                "codigo_ibge": 15,
                "sigla": "PA"
              },
              "cidade": {
                "codigo_ibge": 150140,
                "nome_municipio": "Belém"
              },
              "cep": "71.000-000",
              "bairro": "Rua de Cima",
              "endereco": "Avenida Nao Importa",
              "complemento": "Rua de Baixo"
            },
            "telefones": {
              "telefone_um": "22020205950",
              "telefone_dois": "",
              "telefone_tres": ""
            },
            "endereco_eletronico": "http://www.cultura.gov.br/snc"
          }
        }]
      },
    };

    service.search().subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal/');    
    req.flush(response);
    httpMock.verify();
  });

  it('retorna as meta-informações do endpoint sistemadeculturalocal', () => {
    let response = {
      "_links": {
        "next": {
          "href": "http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal.json?limit=10&offset=10"
        },
        "self": {
          "href": "http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal.json"
        },
        "page": {
          "href": "http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal.json?limit={?page}",
          "templated": true
        }
      },
      "count": 2966,
      "page_size": 10
    };

    service.search().subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(request => request.method === 'GET' &&
      request.url === 'http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal/');
    req.flush(response);
    httpMock.verify();
  });
});
