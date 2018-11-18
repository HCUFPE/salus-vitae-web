import { ItemPrescricao } from './../../models/item-prescricao.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Medicamento } from '../../models/medicamento.model';
import { ErrorHandler } from '../../app.error-handles';
import { SALUS_API } from '../../app.api';

@Injectable()
export class MedicamentosService {

  constructor(private http: HttpClient) { }

  medicamentosById(ids: string[]): Observable<Medicamento> {
    return new Observable((observer) => {
      ids.forEach(id => {
        this.http
        .get(`${SALUS_API}/medicamentos/${id}`).subscribe(
          (medicamento: Medicamento) => observer.next(medicamento),
          (error: any) => observer.error(error)
        );
      });
    });
  }

  itensById(ids: string[]): Observable<ItemPrescricao> {
    return new Observable((observer) => {
      ids.forEach(id => {
        this.http
        .get(`${SALUS_API}/medicamentos/${id}`).subscribe(
          (itemPrescricao: ItemPrescricao) => observer.next(itemPrescricao),
          (error: any) => observer.error(error)
        );
      });
    });
  }

}
