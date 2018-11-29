import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SALUS_API } from '../../app.api';
import { Aprazamento } from '../../models/aprazamento.model';
import { PreOperacao } from '../../models/pre-operacao.model';
import { Operacao } from '../../models/operacao.model';
import { Prontuario } from '../../models/prontuario.model';
import { Atendimento } from '../../models/atendimento.model';
import { ProntuariosService } from '../prontuarios/prontuarios.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AprazamentosService {
  constructor(private http: HttpClient, private prontuariosService: ProntuariosService) { }

  aprazamentos(): Observable<PreOperacao[]> {
    return this.http.get<PreOperacao[]>(`${SALUS_API}/preOpAprazamentos`);
  }

  async aprazamentosComDetalhes(): Promise<PreOperacao[]> {
    const prontuarios: Map<number, Prontuario> = new Map();
    const atendimentos: Map<Number, Atendimento> = new Map();
    let aprazamentos: PreOperacao[] = await this.aprazamentos().toPromise();

    if (aprazamentos) {
      aprazamentos = aprazamentos.filter(a => a.status);
    }

    for (const aprazamento of aprazamentos) {
      if (!prontuarios.has(aprazamento.cdProntuario)) {
        let prontuario: Prontuario;

        try {
          prontuario = await this.prontuariosService.listarProntuariosHC(aprazamento.cdProntuario).toPromise();
          prontuario = await this.prontuariosService.prontuarioComDetalhes(prontuario);
        } catch (err) {
        }

        prontuarios.set(aprazamento.cdProntuario, prontuario);
      }

      if (!atendimentos.has(aprazamento.cdAtendimento)) {
        let atendimento: Atendimento;

        try {
          atendimento = await this.prontuariosService.atendimentoHC(aprazamento.cdProntuario, aprazamento.cdAtendimento).toPromise();
        } catch (err) {
        }

        atendimentos.set(aprazamento.cdAtendimento, atendimento);
      }

      aprazamento.prontuario = prontuarios.get(aprazamento.cdProntuario);
      aprazamento.atendimento = atendimentos.get(aprazamento.cdAtendimento);

      if (aprazamento.atendimento !== undefined) {
        aprazamento.prescricao = aprazamento.atendimento.prescricoes
          .find(p => p.prescricao === aprazamento.cdPrescricao);
      }

      if (aprazamento.prescricao !== undefined) {
        aprazamento.itemPrescricao = aprazamento.prescricao.Itens.find(i => i.ordemItem === aprazamento.ordemItem &&
          i.codigoTipoItem === aprazamento.cdTpItem &&
          i.codigoItem === aprazamento.cdItem);
      }
    }

    return aprazamentos;
  }

  aprazamentosById(id: string): Observable<Aprazamento> {
    return this.http.get<Aprazamento>(`${SALUS_API}/preOpAprazamentos/${id}`, httpOptions);
  }

  aprazarMedicamento(aprazamento: PreOperacao): Observable<PreOperacao> {
    const body: PreOperacao = Object.assign({}, aprazamento);
    body.prontuario = undefined;
    body.atendimento = undefined;
    body.itemPrescricao = undefined;

    return this.http.post<PreOperacao>(`${SALUS_API}/preOpAprazamentos`, body);
  }

  async aprazarMedicamentos(aprazamentos: PreOperacao[]): Promise<PreOperacao[]> {
    const response: PreOperacao[] = [];

    for (const aprazamento of aprazamentos) {
      try {
        response.push(await this.aprazarMedicamento(aprazamento).toPromise());
      } catch (error) {
        response.push(error);
      }
    }

    return response;
  }

  rodelagemAprazamento(preOperacao: Operacao): Observable<Operacao> {
    return this.http.post<Operacao>(`${SALUS_API}/opConsumoRodelagem`, preOperacao);
  }

}
