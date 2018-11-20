import { HC_API } from './../../app.api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SALUS_API} from '../../app.api';
import { Prontuario } from '../../models/prontuario.model';
import { Ala } from '../../models/ala.model';

import { HttpRequest, HttpResponse,
  HttpHeaders, HttpParams } from '@angular/common/http';
  import { Prescricao } from 'src/app/models/prescricao.model';

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
    constructor(private http: HttpClient) {}

    prontuarios(): Observable<Prontuario[]> {
      return this.http.get<Prontuario[]>(`${SALUS_API}/prontuarios`);
    }

    prontuariosById(id: string): Observable<Prontuario> {  
      return this.http.get<Prontuario>(`${HC_API}/prontuario/${id}`);
    }

    alas(): Observable<Ala> {
      return this.http.get<Ala>(`${HC_API}/humaster/ws/ala/${codigoAla}`, httpOptions);
    }

    listarProntuariosHC(prontuario: number): Observable<Prontuario> {
      return this.http.get<Prontuario>(`${HC_API}/humaster/ws/prontuario/${prontuario}`, httpOptions);
    }

    listarPrescricoesHC(prontuario: number,  atendimento: number): Observable<Prescricao> {
      return this.http.get<Prescricao>(`${HC_API}/humaster/ws/prontuario/${prontuario}/atendimento/${atendimento}`, httpOptions);
    }

  }
