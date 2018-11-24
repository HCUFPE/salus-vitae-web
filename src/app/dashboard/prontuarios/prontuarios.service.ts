import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HC_API, SALUS_API } from '../../app.api';
import { Prontuario } from '../../models/prontuario.model';
import { Ala } from '../../models/ala.model';
import { Atendimento } from '../../models/atendimento.model';

const httpOptions = {
  headers: new HttpHeaders({
    // tslint:disable-next-line:max-line-length
    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTQUxVU19WSVRBRSIsImlhdCI6MTU0Mjc0NTQzNiwiYWRtaW4iOiJmYWxzZSJ9.i_L5PDneG68_j_b0DRG-AgwgVtki-9_mJQr-4GP6XMFL5zz5dJ6rcoKtsFsfRbdUJe4ufKyjl2ZCwBMCXw9Fag',
    'Content-Type': 'application/json'
  })
};
const codigoAla = '5N1000';


@Injectable()
export class ProntuariosService {

  constructor(private http: HttpClient) { }

  prontuarios(): Observable<Prontuario[]> {
    return this.http.get<Prontuario[]>(`${SALUS_API}/prontuario`);
  }

  prontuariosById(id: string): Observable<Prontuario> {
    return this.http.get<Prontuario>(`${HC_API}/prontuario/${id}`);
  }

  alas(): Observable<Ala> {
    return this.http.get<Ala>(`${HC_API}/humaster/ws/ala/${codigoAla}`, httpOptions);
  }

  listarProntuariosHC(prt:number | string): Observable<Prontuario> {
    return this.http.get<Prontuario>(`${HC_API}/humaster/ws/prontuario/${prt}`, httpOptions);
  }

  atendimentoHC(prt:number | string, atd:number | string): Observable<Atendimento> {
    return this.http.get<Atendimento>(`${HC_API}/humaster/ws/prontuario/${prt}/atendimento/${atd}`, httpOptions);
  }

}
