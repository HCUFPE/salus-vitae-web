import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';

import { Usuario } from '../../models/usuario.model';
import { AprazamentosService } from '../aprazamentos/aprazamentos.service';
import { Aprazamento } from '../../models/aprazamento.model';
import { PreOperacao } from '../../models/pre-operacao.model';
import { Alert } from '../../shared/errorhandling/index';

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
  public justificativa: string;
  public usuario: Usuario;

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
    this.submitted = true;
    // console.log(form);
    this.bodyParams = {
      isConsumido: false,
      cdPreOperacaoAprazamento: this.aprazamento._id,
      justificativa: this.justificativa,
      dtOperacao: new Date(),
      nmUsuario: window.localStorage.getItem('user')
    };

    this.aprazamentoService.rodelagemAprazamento(this.bodyParams).subscribe(data => {
      this.bodyParams = data;
      console.log(this.bodyParams);
    }, error => {
      const alert = new Alert(null, error);
      this.alerts.push(alert);
      console.log(error);
    });
  }

  createAlertPreOperacao(form: NgForm) {
    swal({
      title: this.translateService.instant('Cancelar Aprazamento'),
      text: this.translateService.instant('Tem certeza que deseja rodelar?'),
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
