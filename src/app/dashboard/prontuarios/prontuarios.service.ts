import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { SALUS_API } from '../../app.api';
import { Prontuario } from '../../models/prontuario.model';

@Injectable()
export class ProntuariosService {
  constructor(private http: HttpClient) {}

  prontuarios(): Observable<Prontuario[]> {
    /*return new Observable<Prontuario[]>(subscriber => {
      this.http
        .get<any>(`http://150.161.30.125:7070/humaster/ws/ala/5N1000`, {
          headers: headers
        })
        .subscribe(
          (res: any) => {
            res.leitos.forEach(leito => {
              this.http
                .get<Prontuario>(
                  `http://150.161.30.125:7070/humaster/ws/prontuario/${leito.prontuario}`,
                  { headers: headers }
                )
                .subscribe(() => {

                });
            });
          },
          (err: any) => {
            subscriber.error(err);
          }
        );
    });*/
    const prontuarios: Prontuario[] = [
      {
        prontuario: 123,
        nomeDoPaciente: 'José Armando',
        dataNascimento: new Date(1994, 1, 25, 0, 0, 0, 0),
        nomeMae: 'Maria do Nascimento',
        sexo: 'M',
        prescricao: undefined,
        leito: { prontuario: 123, atendimento: 123, leito: 1 }
      },
      {
        prontuario: 124,
        nomeDoPaciente: 'Luana Vitória',
        dataNascimento: new Date(1995, 2, 24, 0, 0, 0, 0),
        nomeMae: 'Maria do Carmo',
        sexo: 'F',
        prescricao: undefined,
        leito: { prontuario: 124, atendimento: 124, leito: 2 }
      },
      {
        prontuario: 125,
        nomeDoPaciente: 'Laura Pires',
        dataNascimento: new Date(1996, 3, 23, 0, 0, 0, 0),
        nomeMae: 'Beatriz Pires',
        sexo: 'F',
        prescricao: undefined,
        leito: { prontuario: 125, atendimento: 125, leito: 3 }
      }
    ];

    return of<Prontuario[]>(prontuarios).pipe(delay(4000));
  }

  prontuariosById(id: string): Observable<Prontuario> {
    return this.http.get<Prontuario>(`${SALUS_API}/prontuarios/${id}`);
  }
}
