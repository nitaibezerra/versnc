import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
// import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SlcApiService } from './slc-api.service';

describe('SlcApiService', () => {
  let httpMock, service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        SlcApiService,
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

  it('service tem o metodod get()', () => {
    expect(service.get()).toBeTruthy();
  });

  it('retorna um unico elemento da API', () => {
    let response = {
      "_embedded": {
        "items": [
          {
            "id": 4460,
            "situacao_adesao": {
              "situacao_adesao": "Aguardando envio da documentação"
            },
            "_embedded": {
              "acoes_plano_trabalho": null
            },
            "ente_federado": {
              "cnpj_prefeitura": "14.105.217/0001-70",
              "localizacao": {
                "estado": {
                  "codigo_ibge": 29,
                  "sigla": "BA"
                },
                "cidade": {
                  "codigo_ibge": 292020,
                  "nome_municipio": "Malhada"
                },
                "cep": "46.440-000",
                "bairro": "centro",
                "endereco": "Praça Santa Cruz",
                "complemento": "casa"
              },
              "telefones": {
                "telefone_um": "7736912145",
                "telefone_dois": "",
                "telefone_tres": ""
              },
              "endereco_eletronico": "http://www.malhada.ba.gov.br"
            },
            "conselho": null,
            "_links": {
              "self": {
                "href": "http://snc.cultura.gov.br/api/v1/sistemadeculturalocal/4460/"
              }
            },
            "governo": {
              "nome_prefeito": "Valdemar Larceda  Silva Filho",
              "email_institucional_prefeito": "administracao@malhada.ba.gov.br",
              "termo_posse_prefeito": "/media/termo_posse/termo_OS7pAZV.docx"
            }
          }
        ]
      },
    };

    service.get().subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal/');
    req.flush(response);
    httpMock.verify();
  });

  it('retorna as meta-informações do endpoint sistemadeculturalocal', () => {
    let response = {
      "_links": {
        "self": {
          "href": "http://snc.cultura.gov.br/api/v1/sistemadeculturalocal/"
        },
      "next": {
            "href": "http://snc.cultura.gov.br/api/v1/sistemadeculturalocal/?limit=10&offset=20"
        },
        "page": {
            "templated": true,
            "href": "http://snc.cultura.gov.br/api/v1/sistemadeculturalocal/?limit={?page}&offset=10"
        },
        "previous": {
            "href": "http://snc.cultura.gov.br/api/v1/sistemadeculturalocal/?limit=10"
        }
      },
      "count": 2966,
      "page_size": 10,
    };

    service.get().subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal/');
    req.flush(response);
    httpMock.verify();
  });
});
