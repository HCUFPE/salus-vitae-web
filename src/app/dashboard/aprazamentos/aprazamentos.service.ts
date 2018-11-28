import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SALUS_API } from '../../app.api';
import { Aprazamento } from '../../models/aprazamento.model';
import { PreOperacao } from '../../models/pre-operacao.model';
import { Operacao } from '../../models/operacao.model';

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

  aprazarMedicamento(aprazamento: PreOperacao): Observable<PreOperacao> {
    const body: PreOperacao = Object.assign({}, aprazamento);
    body.prontuario = undefined;
    body.atendimento = undefined;
    body.itemPrescricao = undefined;

    return this.http.post<PreOperacao>(`${SALUS_API}/preOpAprazamentos`, body);
  }

  async aprazarMedicamentos(aprazamentos: PreOperacao[]): Promise<PreOperacao[]> {
    const response: PreOperacao[] = [];

    for (const aprazamento of aprazamentos) {
      try {
        response.push(await this.aprazarMedicamento(aprazamento).toPromise());
      } catch (error) {
        response.push(error);
      }
    }

    return response;
  }

  rodelagemAprazamento(preOperacao: Operacao): Observable<Operacao> {
    return this.http.post<Operacao>(`${SALUS_API}/opConsumoRodelagem`, preOperacao);
  }

}
