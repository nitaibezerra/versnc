import { Component, OnInit } from '@angular/core';
import { SlcApiService } from '../slc-api.service';

@Component({
  selector: 'snc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private slcApiService: SlcApiService) {
  }

  ngOnInit() {
  	this.slcApiService['pageSize'] = 10;
  }

}
