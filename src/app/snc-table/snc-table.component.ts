import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';

import { SlcApiService } from '../slc-api.service';

@Component({
  selector: 'snc-table',
  templateUrl: './snc-table.component.html',
  styleUrls: ['./snc-table.component.css']
})
export class SncTableComponent implements OnInit {

  private sncDataSource: any;
  private count: Number;

  private pageEvent: PageEvent;

  public getServerData(event?: PageEvent) {
    let count: Number = 0;
    let index = 0;
    if (event != null) {
      index = event.pageIndex;
    }
    this.slcapi.get(index * 10).subscribe(
      data => {
        this.sncDataSource = new MatTableDataSource<Localizacao>(data['localizacoes']);
        this.count = data['count'];
      }
    );
  }

  constructor(private slcapi: SlcApiService) {
  }

  ngOnInit() {
    this.getServerData();
  }
}

export interface Localizacao {
  cidade: string;
  uf: string;
}
