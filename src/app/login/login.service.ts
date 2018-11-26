import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { Usuario } from './../models/usuario.model';
import { HC_API } from './../app.api';

import {
    HttpHeaders, HttpParams
} from '@angular/common/http';

@Injectable()
export class LoginService {
    user: Usuario;

    constructor(private http: HttpClient) { }

    isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    loginHC(usuario: string, password: string): Observable<Usuario> {
        const body = new HttpParams()
            .set('grant_type', 'password')
            .set('username', usuario.toUpperCase())
            .set('password', password);

        body.set('Content-Type', 'application/json');
        return this.http.post<Usuario>(`${HC_API}/auth-service/ws/login`, body);
    }

}
