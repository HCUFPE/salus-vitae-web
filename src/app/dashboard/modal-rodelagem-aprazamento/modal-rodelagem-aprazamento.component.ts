import { Atendimento } from './../../models/atendimento.model';
import { AprazamentosService } from './../aprazamentos/aprazamentos.service';
import { Aprazamento } from 'src/app/models/aprazamento.model';
import { PreOperacao } from './../../models/pre-operacao.model';
import { Alert } from './../../shared/errorhandling/index';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-rodelagem-aprazamento',
  templateUrl: './modal-rodelagem-aprazamento.component.html',
  styleUrls: ['./modal-rodelagem-aprazamento.component.css']
})
export class ModalRodelagemAprazamentoComponent implements OnInit, OnDestroy {

  @Input() aprazamento: PreOperacao;
  @Output() hideModal: EventEmitter<Aprazamento> = new EventEmitter();
  @Input() public alerts: Array<Alert> = [];
  @ViewChild('btnClose') btnClose: ElementRef;
  public bodyParams;
  public submitted = false;

  constructor(
    private aprazamentoService: AprazamentosService,
    private translateService: TranslateService) {

  }

  // Inicializar o modal com o horário atual
  ngOnInit() {
    console.log(this.aprazamento);
  }

  // Perfom Confirm

  onSubmit(form: NgForm) {
    // this.submitted = true;
    // console.log(form);
    // const bodyParams: PreOperacao = {
    //   cdProntuario: this.prontuario.prontuario,
    //   cdAtendimento: this.atendimento.atendimento,
    //   cdPrescricao: this.atendimento.prescricoes[0].prescricao,
    //   dtPreOpAprazamento: new Date(),
    //   horarioInicial: this.horario,
    //   intervalo: this.medicamento.frequencia,
    //   cdItem: this.medicamento.codigoItem,
    //   cdTpItem: this.medicamento.codigoTipoItem,
    //   ordemItem: this.medicamento.ordemItem,
    //   nmMedicamento: this.medicamento.descricaoItem,
    //   nmPaciente: this.prontuario.nomeDoPaciente,
    //   nmUsuario: 'teste',
    //   status: true,
    //   quantidade: 1
    // };
    // this.aprazamentoService.createPreOperacao(bodyParams).subscribe(data => {
    //   this.bodyParams = data;
    // }, error => {
    //   const alert = new Alert(null, error);
    //   this.alerts.push(alert);
    // });
  }

  createAlertPreOperacao(form: NgForm) {
    swal({
      title: this.translateService.instant('ALERT@Warning'),
      text: this.translateService.instant('ALERT@Are you sure?'),
      type: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: this.translateService.instant('GLOBAL@Yes'),
      cancelButtonText: this.translateService.instant('GLOBAL@No')
    }).then((result) => {
      if (result.value) {
        this.onSubmit(form);
      }
    });
  }

  close(loginForm: NgForm) {
    loginForm.reset();
    // this.hideModal.emit(this.aprazamento);
  }
  ngOnDestroy() {
    this.btnClose.nativeElement.click();
  }
}
