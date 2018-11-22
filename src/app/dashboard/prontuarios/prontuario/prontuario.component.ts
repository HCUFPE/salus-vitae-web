import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import * as moment from 'moment';

import { ProntuariosService } from '../prontuarios.service';
import { Prontuario } from '../../../models/prontuario.model';
import { Aprazamento } from '../../../models/aprazamento.model';
import { Atendimento } from '../../../models/atendimento.model';
import { Prescricao } from '../../../models/prescricao.model';
import { ItemPrescricao } from 'src/app/models/item-prescricao.model';

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
  modalMedicamento: ItemPrescricao;
  filtro: string;

  constructor(private route: ActivatedRoute, private prontuarioService: ProntuariosService) {
  }

  ngOnInit() {
    this.prontuarioService.atendimentoHC(19569516,
      446702305)
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

  getItensPrescricao(codigoTipoItem: number) {
    const prescricao: Prescricao = this.getUltimaPrescricao();

    if (!prescricao || !prescricao.Itens) {
      return [];
    }

    return prescricao.Itens.filter(i => i.codigoTipoItem === codigoTipoItem);
  }

  showModal(itemPrescricao: ItemPrescricao) {
    if (itemPrescricao.codigoTipoItem === 3) {
      this.modalMedicamento = itemPrescricao;
    }
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
