import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HC_API } from '../../app.api';
import { Prontuario } from '../../models/prontuario.model';
import { Ala } from '../../models/ala.model';
import { Atendimento } from '../../models/atendimento.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
  })
};

const codigoAla = '5N1000';

@Injectable()
export class ProntuariosService {

  constructor(private http: HttpClient) { }

  alas(): Observable<Ala> {
    return this.http.get<Ala>(`${HC_API}/humaster/ws/ala/${codigoAla}`, httpOptions);
  }

  async pacientesInternados(): Promise<Ala> {
    const ala: Ala = await this.alas().toPromise();

    for (const leito of ala.leitos) {
      if (leito.prontuario !== undefined) {
        leito.pacienteInternado = await this.prontuario(leito.prontuario).toPromise();
      }
    }

    return ala;
  }

  prontuario(prontuario: number|string): Observable<Prontuario> {
    return this.http.get<Prontuario>(`${HC_API}/humaster/ws/prontuario/${prontuario}`, httpOptions);
  }

  atendimentos(prontuario: number|string, atendimento: number|string): Observable<Atendimento> {
    return this.http.get<Atendimento>(`${HC_API}/humaster/ws/prontuario/${prontuario}/atendimento/${atendimento}`, httpOptions);
  }

  atendimentoByPrescricao(prontuario: number|string, atendimento: number|string, prescricao: number|string): Observable<Atendimento> {
    return this.http
      .get<Atendimento>(`${HC_API}/humaster/ws/prontuario/${prontuario}/atendimento/${atendimento}?prescricao=${prescricao}`, httpOptions);
  }

}
