import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BuscaComponent } from './busca.component';
import { MaterialModule } from '../material/material.module';
import { SlcApiService } from '../slc-api.service';
import { AppModule } from '../app.module';
import { MessageService } from '../message.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('BuscaComponent', () => {
  let component: BuscaComponent;
  let fixture: ComponentFixture<BuscaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule, HttpClientTestingModule, NoopAnimationsModule, RouterTestingModule],
      declarations: [BuscaComponent],
      providers: [SlcApiService, MessageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica se a query de UF  é setada corretamente ao digitar string de tamanho menor que 3', () => {
    var event;
    event = document.createEvent("Events");
    event.initEvent('keypress', true, false);
    event.keyCode=13;

    component['termoSimples']='df';
    component.onRealizarBuscaComEnter(event);

    expect(component['queries']['estado_sigla']).toEqual('DF');
    expect(component['queries']['nome_municipio']).toEqual('');
  });

  it('Verifica se a query de Municipio é setada corretamente ao digitar string de tamanho maior que 2', () => {
    var event;
    event = document.createEvent("Events");
    event.initEvent('keypress', true, false);
    event.keyCode=13;

    component['termoSimples']='Brasília';
    component.onRealizarBuscaComEnter(event);

    expect(component['queries']['nome_municipio']).toEqual('Brasília');
    expect(component['queries']['estado_sigla']).toEqual('');    
  });
});
