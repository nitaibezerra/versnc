import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';
// import { MaterialModule } from '@angular/material';

import { SncTableComponent } from './snc-table.component';
import { SlcApiService } from '../slc-api.service';
import { BuscaComponent } from '../busca/busca.component';
import { MessageService } from '../message.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SncTableComponent', () => {
  let component: SncTableComponent;
  let fixture: ComponentFixture<SncTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, MaterialModule, NoopAnimationsModule ],
      declarations: [ SncTableComponent, BuscaComponent ],
      providers: [ SlcApiService, MessageService ],
    })
    .compileComponents();
    TestBed.get(SlcApiService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SncTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
