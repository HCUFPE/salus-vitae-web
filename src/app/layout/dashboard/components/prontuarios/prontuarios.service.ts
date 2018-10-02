import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SALUS_API } from '../../../../app.api';
import { ErrorHandler } from '../../../../app.error-handles';
import { Prontuario } from '../../../../models/prontuario.model';

@Injectable()
export class ProntuariosService {
  constructor(private http: Http) {}

  prontuarios(): Observable<Prontuario[]> {
    return this.http.get(`${SALUS_API}/prontuarios`)
    .map(response => response.json())
    .catch(ErrorHandler.handleError);
  }

  prontuariosById(id: string): Observable<Prontuario> {
    return this.http
      .get(`${SALUS_API}/prontuarios/${id}`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }

}
