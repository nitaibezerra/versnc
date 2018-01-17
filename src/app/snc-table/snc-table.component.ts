import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'snc-table',
  templateUrl: './snc-table.component.html',
  styleUrls: ['./snc-table.component.css']
})
export class SncTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let sncDataSource = new MatTableDataSource();
  }

}
