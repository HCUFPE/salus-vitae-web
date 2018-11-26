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
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AprazamentosService {
  constructor(private http: HttpClient) { }

  aprazamentos(): Observable<PreOperacao[]> {
    return this.http.get<PreOperacao[]>(`${SALUS_API}/preOpAprazamentos`);
  }

  aprazamentosById(id: string): Observable<Aprazamento> {
    return this.http.get<Aprazamento>(`${SALUS_API}/preOpAprazamentos/${id}`, httpOptions);
  }

  aprazar(aprazamento: Aprazamento): Observable<boolean> {
    return of(true).pipe(delay(3000));
  }

  createPreOperacao(preOperacao: PreOperacao): Observable<PreOperacao> {
    return this.http.post<PreOperacao>(`${SALUS_API}/preOpAprazamentos`, preOperacao);
  }

  rodelagemAprazamento(preOperacao: PreOperacao): Observable<PreOperacao> {
    return this.http.post<PreOperacao>(`${SALUS_API}/opConsumoRodelagem`, preOperacao);
  }

}
