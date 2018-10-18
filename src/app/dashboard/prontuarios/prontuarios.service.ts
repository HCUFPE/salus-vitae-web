import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SALUS_API } from '../../app.api';
import { Prontuario } from '../../models/prontuario.model';

@Injectable()
export class ProntuariosService {
  constructor(private http: HttpClient) {}

  prontuarios(): Observable<Prontuario[]> {
    return this.http.get<Prontuario[]>(`${SALUS_API}/prontuarios`);
  }

  prontuariosById(id: string): Observable<Prontuario> {
    return this.http.get<Prontuario>(`${SALUS_API}/prontuarios/${id}`);
  }

}
