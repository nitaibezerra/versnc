import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SncTableComponent } from './snc-table.component';

describe('SncTableComponent', () => {
  let component: SncTableComponent;
  let fixture: ComponentFixture<SncTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SncTableComponent ]
    })
    .compileComponents();
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
