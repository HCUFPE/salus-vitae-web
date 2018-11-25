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
import { Alert } from './../../../shared/errorhandling/index';
import { Usuario } from '../../../models/usuario.model';

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
  usuario: Usuario;
  @Input() prontuario: Prontuario;
  @Input() atendimento: Atendimento;
  @Input() medicamento: ItemPrescricao;
  @Output() hideModal: EventEmitter<Aprazamento> = new EventEmitter();
  @Input() public alerts: Array<Alert> = [];
  @ViewChild('btnClose') btnClose: ElementRef;

  public bodyParams;
  public submitted = false;


  constructor(private aprazamentoService: AprazamentosService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    // console.log(this.medicamento);
  }

  // Inicializar o modal com o horário atual
  ngOnInit() {
    this.aprazamentos = [];
    console.log(this.aprazamentos);
    this.horario = new Date();
    this.min = this.horario;
    this.max = moment(this.horario).add(1, 'day').toDate();
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    console.log(form);
    const bodyParams: PreOperacao = {
      cdProntuario: this.prontuario.prontuario,
      cdAtendimento: this.atendimento.atendimento,
      cdPrescricao: this.atendimento.prescricoes[0].prescricao,
      dtPreOpAprazamento: new Date(),
      horarioInicial: this.horario,
      intervalo: this.medicamento.frequencia,
      cdItem: this.medicamento.codigoItem,
      cdTpItem: this.medicamento.codigoTipoItem,
      ordemItem: this.medicamento.ordemItem,
      nmMedicamento: this.medicamento.descricaoItem,
      nmPaciente: this.prontuario.nomeDoPaciente,
      nmUsuario: 'teste',
      status: true,
      quantidade: 1
    };

    this.aprazamentoService.createPreOperacao(bodyParams).subscribe(data => {
      this.bodyParams = data;
    }, error => {
      const alert = new Alert(null, error);
      this.alerts.push(alert);
    });
  }

  // Adicionar quantidade de aprazamentos para o medicamento
  adicionarAprazamento() {
    //this.aprazamentos.push({ status: 'P', cdProntuario: 0, cdAtendimento: 0, dtPreOpAprazamento: null,
    // horarioInicial: new Date(), intervalo: 48, codigoItem: '1', codigoTipoItem: 3, ordemItem: 1, quantidade: 1 });
    //this.aprazamentos.push();
  }

  // Remover medicamento da lista
  removerAprazamento(index: number) {
    this.aprazamentos.splice(index, 1);
  }

  // Retorna observação caso exista o medicamento
  // isObservacao(observacao: ItemPrescricao) {
  //   return this.observacaoMedicamento.match(observacao.observacaoItem);
  // }

  close(loginForm: NgForm) {
    loginForm.reset();
    // this.hideModal.emit(this.aprazamento);
  }


  isRequesting(): boolean {
    return this.aprazamentos !== undefined && this.aprazamentos !== null;
  }

  ngOnDestroy() {
    this.btnClose.nativeElement.click();
  }

}
