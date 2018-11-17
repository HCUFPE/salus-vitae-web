import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { Usuario } from './../models/usuario.model';
import { SALUS_API, HC_API } from './../app.api';

import {
    HttpRequest, HttpResponse,
    HttpHeaders, HttpParams
} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + environment.apiKeyApiSecret,
        'Content-Type': 'application/x-www-form-urlencoded'
    })
};
export interface TokenResponse {
    scope: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    access_token: string;
}

const mockedResponse: TokenResponse = {
    'scope': '',
    'token_type': '',
    'expires_in': 1,
    'refresh_token': '',
    // tslint:disable-next-line:max-line-length
    'access_token': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTQUxVU19WSVRBRSIsImlhdCI6MTU0MTcxOTk5NSwiYWRtaW4iOiJmYWxzZSJ9.BlzNOZz2Wh5S_Q7F6JnFx-VIyvcGfG8ewNiUQRvJq4TnUZsb-XOIMsgtzs8epj_Gj3QBmJBo5h08jQfpFjb-hg'
};

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

    loginHC(usuario, password): Observable<Usuario[]> {
        const body = new HttpParams()
            .set('grant_type', 'password')
            .set('username', usuario.toUpperCase())
            .set('password', password);
        return this.http.post<any>(`${HC_API}/auth-service/ws/login`, body, httpOptions);
    }

    login(id: string, cpf: string): Observable<Usuario> {
        return this.http.get<Usuario>(`${SALUS_API}/users/${id}`);
    }

}
