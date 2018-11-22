import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToastsManager, Toast } from 'ng6-toastr/ng2-toastr';
import * as moment from 'moment';

import { AprazamentosService } from '../../aprazamentos/aprazamentos.service';
import { ItemPrescricao } from '../../../models/item-prescricao.model';
import { Prontuario } from '../../../models/prontuario.model';
import { Aprazamento } from '../../../models/aprazamento.model';
import { PreOperacao } from '../../../models/pre-operacao.model';
import { Atendimento } from 'src/app/models/atendimento.model';

@Component({
  selector: 'app-modal-aprazar',
  templateUrl: './modal-aprazar.component.html',
  styleUrls: ['./modal-aprazar.component.css']
})
export class ModalAprazarComponent implements OnInit, OnDestroy {

  aprazamentos: PreOperacao[];
  horario: Date;
  min: Date;
  max: Date;
  adm_medicamento: string;
  frequencia_medicamento: number;
  observacaoMedicamento: string;
  @Input()  prontuario: Prontuario;
  @Input()  atendimento: Atendimento;
  @Input()  medicamento: ItemPrescricao;
  @Output() hideModal: EventEmitter<Aprazamento> = new EventEmitter();
  @ViewChild('btnClose') btnClose: ElementRef;

  constructor(private aprazamentoService: AprazamentosService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    console.log(this.medicamento);
  }

  // Inicializar o modal com o horário atual
  ngOnInit() {
    this.aprazamentos = [];
    this.horario = new Date();
    this.min = this.horario;
    this.max = moment(this.horario).add(1, 'day').toDate();
    console.log(this.medicamento);
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  // Adicionar quantidade de aprazamentos para o medicamento
  adicionarAprazamento() {
    this.aprazamentos.push({ status: 'P', cdProntuario: 0, cdAtendimento: 0, codigoPrescricao: 0, dtPreOpAprazamento: null,
     horarioInicial: new Date(), intervalo: 48, codigoItem: '1', codigoTipoItem: 3, ordemItem: 1, quantidade: 1 });
  }

  // Remover medicamento da lista
  removerAprazamento(index: number) {
    this.aprazamentos.splice(index, 1);
  }

  // Obter observação do medicamento
  getObservacao() {
    if (this.observacaoMedicamento) {
      let observacao: string = this.observacaoMedicamento;

      if (this.observacaoMedicamento) {
        observacao += `${this.observacaoMedicamento}`;
      }

      return observacao;
    }
  }

  // Obter informação da administração do medicamento
  getAdministracao() {
    if (this.adm_medicamento) {
      let administracao: string = this.adm_medicamento;

      if (this.adm_medicamento) {
        administracao += ` ${this.adm_medicamento}`;
      }

      return administracao;
    }
  }

  // Obter frequência do item do medicamento
  getFrequencia() {
    if (this.frequencia_medicamento) {
      let frequencia: number = this.frequencia_medicamento;

      if (this.frequencia_medicamento) {
        // frequencia += ` - ${this.frequenciaItem}`;
        frequencia += parseFloat(` - ${this.frequencia_medicamento}`);
      }

      return frequencia;
    }
  }

  // Retorna observação caso exista o medicamento
  // isObservacao(observacao: ItemPrescricao) {
  //   return this.observacaoMedicamento.match(observacao.observacaoItem);
  // }

  close(loginForm: NgForm) {
    loginForm.reset();
    // this.hideModal.emit(this.aprazamento);
  }

  // confirmarAprazamento() {
  //   const hr = this.dt_horario.toString().trim();
  //   const regex = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
  //   const dt_aprazamento = this.dt_date.toString().trim();
  //   const now = moment();
  //   const before = moment().add(-1, 'days');
  //   const date = moment(dt_aprazamento);
  //   const dateAfter = moment().add(1, 'days');

  //   if (hr.length === 0 || hr.length === undefined) {
  //     alert('Horário inicial campo obrigatório!');
  //   } else if (regex.test(hr) === false) {
  //     alert('Horário Inválido');
  //   } else if (dt_aprazamento.length === 0 || dt_aprazamento === undefined) {
  //     alert('Data inicial campo obrigatório!');
  //   } else if (!date.isValid() || date.isBefore(before) || date.isAfter(dateAfter)) {
  //     alert('Data Inválida');
  //   } else {
  //     if (confirm('Você tem certeza sobre o aprazamento?\n\n' + 'Data Aprazado: ' +
  //      this.dt_date + '\nHorário Aprazada: ' + this.dt_horario)) {
  //       this.aprazamento = { _id: now.unix().toString(), paciente: this.prontuario.idPaciente,
  //           horario: now.toDate(), enfermeira: null, medicamento: this.medicamento, isConsumido: false,
  //           intervalo: null, isCancelado: false };
  //       this.aprazamentoService.aprazar(this.aprazamento)
  //       .subscribe((res: boolean) => {
  //         if (res) {
  //           this.toastr.success('Aprazamento registrado', 'Successo!')
  //           .then((toast: Toast) => {
  //             setTimeout(() => {
  //               this.btnClose.nativeElement.click();
  //               this.toastr.dismissToast(toast);
  //             }, 1500);
  //           });
  //         } else {
  //           this.toastr.error('Erro ao aprazar', 'Não foi possível realizar o aprazamento.');
  //           this.aprazamento = null;
  //         }
  //       }, () => {
  //         this.toastr.error('Erro ao aprazar', 'Não foi possível realizar o aprazamento.');
  //         this.aprazamento = null;
  //       });

  //     }
  //   }

  // }

  isRequesting(): boolean {
    return this.aprazamentos !== undefined && this.aprazamentos !== null;
  }

  ngOnDestroy() {
    this.btnClose.nativeElement.click();
  }

}
