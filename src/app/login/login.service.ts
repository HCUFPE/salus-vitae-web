import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { Usuario } from './../models/usuario.model';
import { SALUS_API } from './../app.api';

@Injectable()
export class LoginService {
  user: Usuario;

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  usuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${SALUS_API}/users`);
  }

  login(id: string, cpf: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${SALUS_API}/users/${id}`);
  }

}
