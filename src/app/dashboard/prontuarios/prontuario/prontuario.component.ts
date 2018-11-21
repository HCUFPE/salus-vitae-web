import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

import { ProntuariosService } from '../prontuarios.service';
import { Prontuario } from '../../../models/prontuario.model';
import { Medicamento } from '../../../models/medicamento.model';
import { Aprazamento } from '../../../models/aprazamento.model';
import { Atendimento } from '../../../models/atendimento.model';
import { Prescricao } from '../../../models/prescricao.model';

@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.css']
})
export class ProntuarioComponent implements OnInit {

  dados: Boolean = false;
  prontuario: Prontuario;
  atendimento: Atendimento;
  aprazamentos: Aprazamento[];
  filtro: string;
  modalMedicamento: Medicamento;

  constructor(private route: ActivatedRoute, private prontuarioService: ProntuariosService) { }

  ngOnInit() {
    this.prontuarioService.atendimentoHC()
      .subscribe((atendimento: Atendimento) => {
        atendimento.prescricoes = atendimento.prescricoes.sort((a: Prescricao, b: Prescricao) => {
          if (this.getDateFromString(a.dataPrescricao) > this.getDateFromString(b.dataPrescricao)) {
            return -1;
          }

          if (this.getDateFromString(a.dataPrescricao) < this.getDateFromString(b.dataPrescricao)) {
            return 1;
          }

          return 0;
        });
        this.atendimento = atendimento;
        console.log(atendimento);
      });
    this.aprazamentos = [];
  }

  getUltimaPrescricao() {
    if (!this.atendimento || !this.atendimento.prescricoes || this.atendimento.prescricoes.length === 0) {
      return null;
    }

    return this.atendimento.prescricoes[0];
  }

  getDateFromString(date: string) {
    if (!date) {
      return null;
    }

    return moment(date, 'DD/MM/YYYY HH:mm:ss').toDate();
  }

  isAprazado(medicamento: Medicamento) {
    return this.aprazamentos.filter(a => a.medicamento._id === medicamento._id).length > 0;
  }

  getItensPrescricao(codigoTipoItem: number) {
    const prescricao: Prescricao = this.getUltimaPrescricao();

    if (!prescricao || !prescricao.Itens) {
      return [];
    }

    return prescricao.Itens.filter(i => i.codigoTipoItem === codigoTipoItem);
  }

  showModal(medicamento: Medicamento) {
    this.modalMedicamento = medicamento;
  }

  dismissModal(aprazamento) {
    this.aprazamentos.push(aprazamento);

    this.modalMedicamento = undefined;
  }

  escApra(apr2) {
    this.dados = false;
  }

  escDet(apr1) {
    this.dados = true;
  }

}
