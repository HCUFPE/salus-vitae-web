import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SALUS_API } from '../../app.api';
import { Aprazamento } from '../../models/aprazamento.model';
import { PreOperacao } from 'src/app/models/pre-operacao.model';

const httpOptions = {
  headers: new HttpHeaders({
    // tslint:disable-next-line:max-line-length
    'Access-Control-Allow-Origin':'*',
    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTQUxVU19WSVRBRSIsImlhdCI6MTU0Mjc0NTQzNiwiYWRtaW4iOiJmYWxzZSJ9.i_L5PDneG68_j_b0DRG-AgwgVtki-9_mJQr-4GP6XMFL5zz5dJ6rcoKtsFsfRbdUJe4ufKyjl2ZCwBMCXw9Fag',
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AprazamentosService {
  constructor(private http: HttpClient) {}

  aprazamentos(): Observable<PreOperacao[]> {
    return this.http.get<PreOperacao[]>(`${SALUS_API}/preOpAprazamentos`);
  }

  aprazamentosById(id: string): Observable<Aprazamento> {
    return this.http.get<Aprazamento>(`${SALUS_API}/preOpAprazamentos/${id}`,httpOptions);
  }

  aprazar(aprazamento: Aprazamento): Observable<boolean> {
    return of(true).pipe(delay(3000));
  }

}
