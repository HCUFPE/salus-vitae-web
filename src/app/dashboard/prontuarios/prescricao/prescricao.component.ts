import { ModalRodelagemAprazamentoComponent } from './../../modal-rodelagem-aprazamento/modal-rodelagem-aprazamento.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';

import { Prontuario } from '../../../models/prontuario.model';
import { Atendimento } from '../../../models/atendimento.model';
import { Prescricao } from '../../../models/prescricao.model';
import { ItemPrescricao } from '../../../models/item-prescricao.model';
import { PreOperacao } from '../../../models/pre-operacao.model';
import { AprazamentosService } from '../../aprazamentos/aprazamentos.service';
import { ProntuariosService } from '../prontuarios.service';
import { ModalAprazarComponent } from '../modal-aprazar/modal-aprazar.component';
import { Operacao } from 'src/app/models/operacao.model';

@Component({
  selector: 'app-prescricao',
  templateUrl: './prescricao.component.html',
  styleUrls: ['./prescricao.component.css']
})
export class PrescricaoComponent implements OnInit {

  prontuario: Prontuario;
  atendimento: Atendimento;
  aprazamentos: PreOperacao[];
  filtro: string;
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
    private aprazamentoService: AprazamentosService,
    private modalService: NgbModal,
    private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.getProntuarioById();

    this.prontuarioService
      .atendimentos(
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
        this.validateFields();
        this.refreshAprazamentos();
      });
  }


  public getProntuarioById() {
    this.prontuarioService.prontuario(this.route.snapshot.paramMap.get('prontuario_id'))
      .subscribe(data => {
        this.prontuario = data;
      });
  }

  public getUltimaPrescricao() {
    if (!this.atendimento || !this.atendimento.prescricoes || this.atendimento.prescricoes.length === 0) {
      return null;
    }

    return this.atendimento.prescricoes[0];
  }

  public getAprazamentos() {
    if (!this.aprazamentos) {
      return [];
    }

    return this.aprazamentos.filter(a => a.cdPrescricao === this.prescricaoSelected.prescricao);
  }

  public refreshAprazamentos() {
    this.aprazamentoService
      .aprazamentos()
      .subscribe((aprazamentos: PreOperacao[]) => {
        this.aprazamentos = aprazamentos.filter(
          a =>
            a.status &&
            a.cdProntuario === +this.route.snapshot.paramMap.get('prontuario_id') &&
            a.cdAtendimento === +this.route.snapshot.paramMap.get('atendimento_id')
        );
        this.aprazamentos.forEach(
          a =>
            (a.itemPrescricao = this.atendimento.prescricoes
              .find(p => p.prescricao === a.cdPrescricao)
              .Itens.find(
                i =>
                  i.ordemItem === a.ordemItem &&
                  i.codigoTipoItem === a.cdTpItem &&
                  i.codigoItem === a.cdItem
              ))
        );
      });
  }

  public selecionarPrescricao(prescricao: Prescricao) {
    if (!prescricao) {
      return;
    }

    this.prescricaoSelected = prescricao;
    this.validateFields();
  }

  public validateFields() {
    if (this.prescricaoSelected.tipoPrescricao === 'M') {
      this.prescricaoSelected.tipoPrescricao = 'Medicamentos';
    } else if (this.prescricaoSelected.tipoPrescricao === 'E') {
      this.prescricaoSelected.tipoPrescricao = 'Enfermeira';
    }

    if (this.prescricaoSelected.statusPrescricao === 'A') {
      this.prescricaoSelected.statusPrescricao = 'Assinada';
    } else if (this.prescricaoSelected.statusPrescricao === 'N') {
      this.prescricaoSelected.statusPrescricao = 'Cancelada';
    } else {
      this.prescricaoSelected.statusPrescricao = 'Em Uso';
    }
  }

  public getPrescricoes() {
    if (
      !this.atendimento ||
      !this.atendimento.prescricoes
    ) {
      return [];
    }
    return this.atendimento.prescricoes;
  }

  public getDateFromString(date: string) {
    if (!date) {
      return null;
    }

    return moment(date, 'DD/MM/YYYY HH:mm:ss').toDate();
  }

  public getItensPrescricao(codigoTipoItem: number) {
    if (!this.prescricaoSelected || !this.prescricaoSelected.Itens) {
      return [];
    }

    return this.prescricaoSelected.Itens.filter(
      i => i.codigoTipoItem === codigoTipoItem
    );
  }

  public isAtual() {
    return moment(this.atendimento.prescricoes[0].dataPrescricao, 'DD/MM/YYYY HH:mm')
      .isSame(moment(this.prescricaoSelected.dataPrescricao, 'DD/MM/YYYY HH:mm'), 'day');
  }

  public showModalAprazamento(itemPrescricao: ItemPrescricao) {
    if (itemPrescricao.codigoTipoItem === 3 && this.isAtual()) {
      const modal: NgbModalRef = this.modalService.open(ModalAprazarComponent,
        { backdrop: 'static', centered: true, keyboard: false, size: 'lg' });
      modal.componentInstance.prontuario = this.prontuario;
      modal.componentInstance.atendimento = this.atendimento;
      modal.componentInstance.prescricao = this.prescricaoSelected;
      modal.componentInstance.medicamento = itemPrescricao;
      modal.result
        .then((aprazamentos: PreOperacao[]) => {
          this.aprazamentos.push(...aprazamentos);
          this.toastrService.success('Aprazamentos realizados com sucesso!', 'Sucesso!', { timeOut: 2000 });
        }).catch(() => null);
    }
  }

  public showModalRodelagemAprazamento(aprazamento: PreOperacao) {
    const modal: NgbModalRef = this.modalService.open(ModalRodelagemAprazamentoComponent,
      { backdrop: 'static', centered: true, keyboard: false, size: 'lg' });
    modal.componentInstance.aprazamento = aprazamento;
    modal.result
      .then((cancelamento: Operacao) => {
        this.aprazamentos
          .splice(this.aprazamentos.findIndex(a => a._id === cancelamento.cdPreOperacaoAprazamento), 1);
        this.toastrService.success('Aprazamentos cancelados com sucesso!', 'Sucesso!', { timeOut: 2000 });
      }).catch(() => null);;
  }

}

