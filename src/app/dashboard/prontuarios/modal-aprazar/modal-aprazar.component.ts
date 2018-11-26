import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToastsManager, Toast } from 'ng6-toastr/ng2-toastr';
import swal from 'sweetalert2';
import * as moment from 'moment';

import { AprazamentosService } from '../../aprazamentos/aprazamentos.service';
import { ItemPrescricao } from '../../../models/item-prescricao.model';
import { Prontuario } from '../../../models/prontuario.model';
import { Aprazamento } from '../../../models/aprazamento.model';
import { PreOperacao } from '../../../models/pre-operacao.model';
import { Atendimento } from 'src/app/models/atendimento.model';
import { Alert } from './../../../shared/errorhandling/index';
import { Usuario } from '../../../models/usuario.model';
import { TranslateService } from '@ngx-translate/core';

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
  @ViewChild('modalAprazamento') public modal: ModalAprazarComponent;
  public bodyParams;
  public submitted = false;

  swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
  });

  constructor(
  private aprazamentoService: AprazamentosService,
  public toastr: ToastsManager, vcr: ViewContainerRef,
  private translateService: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
    // console.log(this.medicamento);
  }

  // Inicializar o modal com o horário atual
  ngOnInit() {
    this.aprazamentos = [];
    this.adicionarAprazamento();
    console.log(this.aprazamentos);
    this.horario = new Date();
    this.min = this.horario;
    // this.max = moment(this.horario).add(1, 'day').toDate();
  }

  // Perfom Confirm

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
      this.toastr.success('Aprazamento realizado com sucesso!', 'Succeso!')
      .then((toast: Toast) => {
          setTimeout(() => {
              this.toastr.dismissToast(toast);
          }, 2000);
      });

    }, error => {
      const alert = new Alert(null, error);
      this.alerts.push(alert);
    });
  }

  // Adicionar quantidade de aprazamentos para o medicamento
  adicionarAprazamento() {
    this.aprazamentos.push({status: false , cdProntuario: 0, cdAtendimento: 0, dtPreOpAprazamento: null,
      horarioInicial: new Date(), intervalo: 60, cdItem: '1', cdTpItem: 3, ordemItem: 1, quantidade: 1, nmMedicamento: 'teste',
      nmPaciente: 'teste', nmUsuario: 'teste', cdPrescricao: 1 });
    }

    createAlertPreOperacao(form: NgForm) {
      swal({
        title: this.translateService.instant('Deseja Realizar o aprazamento?'),
        type: 'warning',
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonText: this.translateService.instant('Sim'),
        cancelButtonText: this.translateService.instant('Não')
      }).then((result) => {
        if (result.value) {
          this.onSubmit(form);
          // this.swalWithBootstrapButtons(
          //   'Aprazamento realizado com sucesso!'
          // );
        } else if (result.dismiss === swal.DismissReason.cancel) {
          this.swalWithBootstrapButtons(
            'Aprazamento não realizado!'
          );
        }
        // $('#modalAprazamento').modal('destroy');
      });
    }
    // Remover medicamento da lista
    removerAprazamento(index: number) {
      this.aprazamentos.splice(index, 1);
    }

      close(closeAprazarForm: NgForm) {
        closeAprazarForm.reset();
      }

      ngOnDestroy() {
        this.btnClose.nativeElement.click();
      }
    }
