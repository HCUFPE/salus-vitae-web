import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
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

  aprazar(aprazamento: Aprazamento): Observable<boolean> {
    return of(true).pipe(delay(3000));
  }

}
