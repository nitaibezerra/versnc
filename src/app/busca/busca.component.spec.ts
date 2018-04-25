import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BuscaComponent } from './busca.component';
import { MaterialModule } from '../material/material.module';
import { SlcApiService } from '../slc-api.service';
import { AppModule } from '../app.module';
// import { MessageComponent } from '../message/message.component';
import { MessageService} from '../message.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BuscaComponent', () => {
  let component: BuscaComponent;
  let fixture: ComponentFixture<BuscaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule, HttpClientTestingModule, NoopAnimationsModule],
      declarations: [ BuscaComponent ],
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
});
