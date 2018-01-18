import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SlcApiService {

  constructor(private http: HttpClient) {  }

  get() {
    return this.http.get('http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal/');
  }
}
