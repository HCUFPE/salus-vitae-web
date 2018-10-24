import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SALUS_API } from '../../app.api';
import { Aprazamento } from '../../models/aprazamento.model';

@Injectable()
export class AprazamentosService {
  constructor(private http: HttpClient) {}

  aprazamentos(): Observable<Aprazamento[]> {
    return this.http.get<Aprazamento[]>(`${SALUS_API}/aprazamentos`);
  }

  aprazamentosById(id: string): Observable<Aprazamento> {
    return this.http.get<Aprazamento>(`${SALUS_API}/aprazamentos/${id}`);
  }

}
