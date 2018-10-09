import { HttpClient } from '@angular/common/http';
import { ErrorHandler } from './../app.error-handles';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { Usuario } from './../models/usuario.model';
import { SALUS_API } from './../app.api';

@Injectable()
export class LoginService {
  user: Usuario;

  constructor(private http: Http, private httpClient: HttpClient) { }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  usuarios(): Observable<Usuario[]> {
    return this.http.get(`${SALUS_API}/users`)
    .map(response => response.json())
    .catch(ErrorHandler.handleError);
  }

  login(id: string, cpf: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${SALUS_API}/users/${id}`);
  }

}
