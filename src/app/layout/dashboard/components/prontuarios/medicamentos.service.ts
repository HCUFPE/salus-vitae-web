import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';

import { Medicamento } from '../../../../models/medicamento.model';
import { SALUS_API } from '../../../../app.api';
import { ErrorHandler } from '../../../../app.error-handles';

@Injectable()
export class MedicamentosService {

  constructor(private http: Http) { }

  medicamentosById(ids: string[]): Observable<Medicamento> {
    return new Observable((observer) => {
      ids.forEach(id => {
        this.http
        .get(`${SALUS_API}/medicamentos/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError).subscribe(
          (medicamento: Medicamento) => observer.next(medicamento),
          (error: any) => observer.error(error)
        );
      });
    });
  }

}
