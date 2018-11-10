import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Medicamentos } from '../../models/medicamentos.model';
import { ErrorHandler } from '../../app.error-handles';
import { SALUS_API } from '../../app.api';

@Injectable()
export class MedicamentosService {

  constructor(private http: HttpClient) { }

  medicamentosById(ids: string[]): Observable<Medicamentos> {
    return new Observable((observer) => {
      ids.forEach(id => {
        this.http
        .get(`${SALUS_API}/medicamentos/${id}`).subscribe(
          (medicamento: Medicamentos) => observer.next(medicamento),
          (error: any) => observer.error(error)
        );
      });
    });
  }

}
