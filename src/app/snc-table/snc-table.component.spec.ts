import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';
// import { MaterialModule } from '@angular/material';

import { SncTableComponent } from './snc-table.component';
import { SlcApiService } from '../slc-api.service';

describe('SncTableComponent', () => {
  let component: SncTableComponent;
  let fixture: ComponentFixture<SncTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, MaterialModule ],
      declarations: [ SncTableComponent ],
      providers: [ SlcApiService ],
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
