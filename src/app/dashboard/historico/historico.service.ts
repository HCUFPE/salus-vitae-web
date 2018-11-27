import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operacao } from '../../models/operacao.model';
import { SALUS_API } from '../../app.api';
import { PreOperacao } from 'src/app/models/pre-operacao.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class HistoricoService {
  filtro: string;
  constructor(private http:HttpClient) { }
  
  historicoConsumo(): Observable<Operacao[]>{
      return this.http.get<Operacao[]>(`${SALUS_API}/opConsumoRodelagem`);
  }

  HistoricoById(id:Operacao):Observable<PreOperacao>{
    return this.http.get<PreOperacao>(`${SALUS_API}/preOpAprazamentos`);
  }


}
