import { ErrorHandler } from './../../../../app.error-handles';
import { Observable } from 'rxjs/Observable';
import { Paciente } from './paciente/paciente.model';
import { SALUS_API } from './../../../../app.api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PacientesService {
  constructor(private http: Http) {}

  pacientes(): Observable<Paciente[]> {
    return this.http.get(`${SALUS_API}/pacientes`)
    .map(response => response.json())
    .catch(ErrorHandler.handleError);
  }

  pacientesById(id: string): Observable<Paciente> {
    return this.http
      .get(`${SALUS_API}/pacientes/${id}`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }

  // medicamentoOfPaciente(id: string): Observable<Medicamento[]> {
  //   return this.http
  //     .get(`${SALUS_API}/pacientes/${id}/medicamento`)
  //     .map(response => response.json())
  //     .catch(ErrorHandler.handleError);
  // }

}
