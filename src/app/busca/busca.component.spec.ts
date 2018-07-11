import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BuscaComponent } from './busca.component';
import { MaterialModule } from '../material/material.module';
import { SlcApiService } from '../slc-api.service';
import { AppModule } from '../app.module';
import { MessageService } from '../message.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { renderTemplate, elementStart } from '@angular/core/src/render3/instructions';
import { element } from 'protractor';

describe('BuscaComponent', () => {
  let component: BuscaComponent;
  let fixture: ComponentFixture<BuscaComponent>;
  
  let event;
  event = document.createEvent("Events");
  event.initEvent('keypress', true, false);    
  event.keyCode = 13;

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
    component['termoSimples'] = 'df';
    component.onRealizarBuscaComEnter(event);

    expect(component['queries']['estado_sigla']).toEqual('DF');
    expect(component['queries']['nome_municipio']).toEqual('');
  });

  it('Verifica se a query de Municipio é setada corretamente ao digitar string de tamanho maior que 2', () => {
    component['termoSimples'] = 'Brasília';
    component.onRealizarBuscaComEnter(event);

    expect(component['queries']['nome_municipio']).toEqual('Brasília');
    expect(component['queries']['estado_sigla']).toEqual('');
  });

  it('Verifica se descrição do campo de busca contem - Consulte seu Estado ou Município - ', () => {
    const htmlComponent = fixture.debugElement.nativeElement;
    expect(htmlComponent.querySelector('h4').textContent).toContain('Consulte seu Estado ou Município');
  });

  it('Verifica se a informação digitada na busca é armazenada corretamente no componente', inject([SlcApiService], (service: SlcApiService) => {
    let htmlComponent = fixture.debugElement.nativeElement;    
    let inputElement = htmlComponent.querySelector('input');

    inputElement.value = 'Barreiras';
    inputElement.dispatchEvent(new Event('input'));

    component.onRealizarBuscaComEnter(event);
    expect(component['termoSimples']).toBe('Barreiras');
  }));
});
