import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import * as moment from 'moment';

import { ProntuariosService } from '../prontuarios.service';
import { Prontuario } from '../../../models/prontuario.model';
import { Atendimento } from '../../../models/atendimento.model';
import { Prescricao } from '../../../models/prescricao.model';
import { AprazamentosService } from '../../aprazamentos/aprazamentos.service';
import { ItemPrescricao } from 'src/app/models/item-prescricao.model';
import { PreOperacao } from 'src/app/models/pre-operacao.model';

@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.css']
})
export class ProntuarioComponent implements OnInit {
  dados: Boolean = false;
  prontuario: Prontuario;
  atendimento: Atendimento;
  aprazamentos: PreOperacao[];
  filtro: string;
  modalMedicamento: ItemPrescricao;
  prescricaoSelected: Prescricao;
  paginationMedicamento = 1;
  paginationAprazamento = 1;
  paginationDieta = 1;
  paginationHomoderivado = 1;
  paginationCuidado = 1;
  paginationProcedimento = 1;

  constructor(
    private route: ActivatedRoute,
    private prontuarioService: ProntuariosService,
    private aprazamentoService: AprazamentosService
  ) {}

  ngOnInit() {
    this.prontuarioService
      .atendimentoHC(
        this.route.snapshot.paramMap.get('prontuario_id'),
        this.route.snapshot.paramMap.get('atendimento_id')
      )
      .subscribe((atendimento: Atendimento) => {
        atendimento.prescricoes = atendimento.prescricoes.sort(
          (a: Prescricao, b: Prescricao) => {
            if (
              this.getDateFromString(a.dataPrescricao) >
              this.getDateFromString(b.dataPrescricao)
            ) {
              return -1;
            }

            if (
              this.getDateFromString(a.dataPrescricao) <
              this.getDateFromString(b.dataPrescricao)
            ) {
              return 1;
            }

            return 0;
          }
        );
        this.atendimento = atendimento;
        this.prescricaoSelected = this.getUltimaPrescricao();
        console.log(atendimento);

        this.aprazamentoService
          .aprazamentos()
          .subscribe((aprazamentos: PreOperacao[]) => {
            this.aprazamentos = aprazamentos.filter(
              a =>
                a.status === 'P' &&
                a.cdProntuario ===
                  +this.route.snapshot.paramMap.get('prontuario_id') &&
                a.cdAtendimento ===
                  +this.route.snapshot.paramMap.get('atendimento_id')
            );
            this.aprazamentos.forEach(
              a =>
                (a.itemPrescricao = this.atendimento.prescricoes
                  .find(
                    p => p.prescricao === this.prescricaoSelected.prescricao
                  )
                  .Itens.find(
                    i =>
                      i.ordemItem === a.ordemItem &&
                      i.codigoTipoItem === a.cdTpItem &&
                      i.codigoItem === a.cdItem + ''
                  ))
            );
          });
      });
  }

  public loadPageMedicamento(page: number) {
    this.paginationMedicamento = page;
    this.paginationAprazamento = 1;
  }

  public printarTudo() {
    console.log(this.paginationMedicamento);
    console.log(this.paginationAprazamento);
  }

  getUltimaPrescricao() {
    if (
      !this.atendimento ||
      !this.atendimento.prescricoes ||
      this.atendimento.prescricoes.length === 0
    ) {
      return null;
    }

    return this.atendimento.prescricoes[0];
  }

  selecionarPrescricao(prescricao: Prescricao) {
    if (!prescricao) {
      return;
    }

    this.prescricaoSelected = prescricao;
  }

  getPrescricoes() {
    if (
      !this.atendimento ||
      !this.atendimento.prescricoes ||
      this.atendimento.prescricoes.length === 0
    ) {
      return [];
    }
    return this.atendimento.prescricoes;
  }

  getDateFromString(date: string) {
    if (!date) {
      return null;
    }

    return moment(date, 'DD/MM/YYYY HH:mm:ss').toDate();
  }

  getItensPrescricao(codigoTipoItem: number) {
    if (!this.prescricaoSelected || !this.prescricaoSelected.Itens) {
      return [];
    }

    return this.prescricaoSelected.Itens.filter(
      i => i.codigoTipoItem === codigoTipoItem
    );
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
