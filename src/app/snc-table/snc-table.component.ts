import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';

import { SlcApiService } from '../slc-api.service';

@Component({
  selector: 'snc-table',
  templateUrl: './snc-table.component.html',
  styleUrls: ['./snc-table.component.css']
})
export class SncTableComponent implements OnInit {

  constructor(private slcapi: SlcApiService) {
  }

  ngOnInit() {
    const sncDataSource = new MatTableDataSource();
    this.slcapi.get()
      .subscribe(res => res['_embedded']['items']);
  }

}
