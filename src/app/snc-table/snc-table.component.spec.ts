import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';
// import { MaterialModule } from '@angular/material';

import { SncTableComponent } from './snc-table.component';
import { SlcApiService } from '../slc-api.service';
import { Entidade } from '../models/entidade.model';
import { BuscaComponent } from '../busca/busca.component';
import { MessageService } from '../message.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

describe('SncTableComponent', () => {
  let component: SncTableComponent;
  let fixture: ComponentFixture<SncTableComponent>;
  let slcApiService: SlcApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, MaterialModule, NoopAnimationsModule, RouterTestingModule ],
      declarations: [ SncTableComponent, BuscaComponent ],
      providers: [ SlcApiService, MessageService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    slcApiService = TestBed.get(SlcApiService);
    fixture = TestBed.createComponent(SncTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    var entidades = [
      {
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
      }
    ]

    slcApiService.buscaAtual = Observable.of(entidades);
    expect(component).toBeTruthy();
  });

  it('verifica a conversão de objeto para array', () => {
    let entidade = {
            "id": 6186,
            "criacao_lei_sistema_cultura": {
              "lei_sistema_cultura": null,
              "situacao": "Em preenchimento"
            },
            "criacao_orgao_gestor": {
              "relatorio_atividade_secretaria": null,
              "situacao": "Em preenchimento"
            },
            "criacao_conselho_cultural": {
              "ata_regimento_aprovado": null,
              "situacao": "Em preenchimento"
            },
            "criacao_fundo_cultura": {
              "cnpj_fundo_cultura": null,
              "lei_fundo_cultura": null,
              "situacao": "Em preenchimento"
            },
            "criacao_plano_cultura": {
              "relatorio_diretrizes_aprovadas": null,
              "minuta_preparada": null,
              "ata_reuniao_aprovacao_plano": null,
              "ata_votacao_projeto_lei": null,
              "lei_plano_cultura": null,
              "situacao": "Em preenchimento"
            },
    };

    let array = component.toArray(entidade);
    expect(array.length).toEqual(6);
    expect(array[0].key).toEqual("id");
  });

  it('verifica a obtenção do nome do componente', () => {
    let nome = "criacao_lei_sistema";
    let nome_humanized = component.getNomeComponente(nome);

    expect(nome_humanized).toEqual("Lei Sistema");
  });

});
