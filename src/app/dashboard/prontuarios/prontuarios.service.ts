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

const httpOptions = {
    headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTQUxVU19WSVRBRSIsImlhdCI6MTU0MTcxOTk5NSwiYWRtaW4iOiJmYWxzZSJ9.BlzNOZz2Wh5S_Q7F6JnFx-VIyvcGfG8ewNiUQRvJq4TnUZsb-XOIMsgtzs8epj_Gj3QBmJBo5h08jQfpFjb-hg',
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

  alas(): Observable<Ala[]> {
    return this.http.get<Ala[]>(`${HC_API}/humaster/ws/ala/${codigoAla}`, httpOptions);
  }

  prontuariosById(id: string): Observable<Prontuario> {
    return this.http.get<Prontuario>(`${SALUS_API}/prontuarios/${id}`);
  }

}
