import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { SALUS_API } from '../../app.api';
import { Operacao } from '../../models/operacao.model';
import { PreOperacao } from '../../models/pre-operacao.model';
import { AprazamentosService } from '../aprazamentos/aprazamentos.service';

@Injectable()
export class HistoricoService {

  constructor(private http: HttpClient, private aprazamentoService: AprazamentosService) { }

  administracoes(): Observable<Operacao[]> {
    return this.http.get<Operacao[]>(`${SALUS_API}/opConsumoRodelagem`);
  }

  async administracoesComDetalhes(): Promise<Operacao[]> {
    let administracoes: Operacao[] = [];
    let aprazamentos: PreOperacao[] = [];

    try {
      administracoes = await this.administracoes().toPromise();
    } catch (err) {
    }

    try {
      aprazamentos = await this.aprazamentoService.aprazamentos().toPromise();
    } catch (err) {
    }

    for (const administracao of administracoes) {
      administracao.aprazamento = aprazamentos.find(a => a._id === administracao.cdPreOperacaoAprazamento);
    }

    try {
      await this.aprazamentoService.aprazamentosComDetalhes(administracoes.map(a => a.aprazamento));
    } catch (err) {
    }

    return administracoes;
  }

}
