import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginator, MatTableDataSource, MatSort, MatSelectModule, MatChipsModule, PageEvent } from '@angular/material';

import { SlcApiService } from '../slc-api.service';
import { Entidade } from '../models/entidade.model';

@Component({
  selector: 'snc-table',
  templateUrl: './snc-table.component.html',
  styleUrls: ['./snc-table.component.css']
})
export class SncTableComponent implements OnInit {

  panelOpenState: boolean = false;

  //Trabalhando a busca: Count e Entidade estão retornando em any
  private count: Number;
  private entidades: Entidade[];

  private sncDataSource: any;
  private pageEvent: PageEvent;

  constructor(private slcApiService: SlcApiService) { }

  @ViewChild(MatPaginator, ) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public getEntesFederados(event?: PageEvent): void {

    let count: Number = 0;
    let index = 0;

    const nomeMunicipio: String = '';
    const uf: String = '';
    const cnpjPrefeitura: String = '';


    if (event != null) {
      index = event.pageIndex;
    }

    this.slcApiService.search(index * 10, count, nomeMunicipio, uf, cnpjPrefeitura).subscribe(
      data => {
        this.sncDataSource = new MatTableDataSource<Entidade>(data['entesFederados'] as Entidade[]);
        // console.info(this.entidades);
        this.sncDataSource.sort = this.sort;
        this.count = data['count'];
      });
  }

  ngOnInit() {
    this.getEntesFederados();
  }
}

