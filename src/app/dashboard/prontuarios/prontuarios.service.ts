import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HC_API, SALUS_API } from '../../app.api';
import { Prontuario } from '../../models/prontuario.model';
import { Ala } from '../../models/ala.model';
import { Atendimento } from '../../models/atendimento.model';

var token = localStorage.getItem("isLoggedin");

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + token,
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

  listarProntuariosHC(prt: number | string): Observable<Prontuario> {
    return this.http.get<Prontuario>(`${HC_API}/humaster/ws/prontuario/${prt}`, httpOptions);
  }

  atendimentoHC(prt: number | string, atd: number | string): Observable<Atendimento> {
    return this.http.get<Atendimento>(`${HC_API}/humaster/ws/prontuario/${prt}/atendimento/${atd}`, httpOptions);
  }

}
