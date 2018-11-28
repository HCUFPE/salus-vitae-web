import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';

import { ToastsManager, Toast } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';
import * as moment from 'moment';

import { AprazamentosService } from '../../aprazamentos/aprazamentos.service';
import { ItemPrescricao } from '../../../models/item-prescricao.model';
import { Prontuario } from '../../../models/prontuario.model';
import { PreOperacao } from '../../../models/pre-operacao.model';
import { Atendimento } from '../../../models/atendimento.model';
import { Prescricao } from '../../../models/prescricao.model';

@Component({
  selector: 'app-modal-aprazar',
  templateUrl: './modal-aprazar.component.html',
  styleUrls: ['./modal-aprazar.component.css']
})
export class ModalAprazarComponent implements OnInit {

  @Input() prontuario: Prontuario;
  @Input() atendimento: Atendimento;
  @Input() prescricao: Prescricao;
  @Input() medicamento: ItemPrescricao;
  public aprazamentos: PreOperacao[] = [];
  public min: Date;
  public max: Date;

  constructor(
    private aprazamentoService: AprazamentosService,
    private translateService: TranslateService,
    public activeModal: NgbActiveModal,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  // Inicializar o modal com o horário atual
  ngOnInit() {
    this.min = new Date();
    let hours = this.min.getHours();

    if (hours < 7) {
      hours += 24;
    }

    hours = 23 - (hours - 7);
    this.max = moment(this.min).add(hours, 'hours').set('minutes', 59).toDate();
  }

  // Adicionar quantidade de aprazamentos para o medicamento
  adicionarAprazamento() {
    this.aprazamentos.push({
      status: true, cdProntuario: this.prontuario.prontuario, cdAtendimento: this.atendimento.atendimento, dtPreOpAprazamento: new Date(),
      horarioInicial: new Date(), intervalo: this.medicamento.frequencia, cdItem: this.medicamento.codigoItem,
      cdTpItem: this.medicamento.codigoTipoItem, ordemItem: this.medicamento.ordemItem, quantidade: 1,
      nmMedicamento: this.medicamento.descricaoItem, nmPaciente: this.prontuario.nomeDoPaciente, nmUsuario: localStorage.getItem('user'),
      cdPrescricao: this.prescricao.prescricao
    });
  }

  onSubmit() {
    swal({
      title: this.translateService.instant('Deseja Realizar o aprazamento?'),
      type: 'warning',
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: this.translateService.instant('Sim'),
      cancelButtonText: this.translateService.instant('Não')
    }).then((result) => {
      if (result.value) {
        this.aprazamentoService.aprazarMedicamentos(this.aprazamentos)
          .then(res => {
            for (let index = 0; index < this.aprazamentos.length; index++) {
              if (res[index]._id) {
                res[index].prontuario = this.prontuario;
                res[index].atendimento = this.atendimento;
                res[index].itemPrescricao = this.medicamento;
              }
            }

            this.activeModal.close(res);
          }).catch(() => {
            this.toastr.error('Não foi possível realizar o aprazamento!', 'Erro!')
              .then((toast: Toast) => {
                setTimeout(() => {
                  this.toastr.dismissToast(toast);
                }, 2000);
              });
          });
      }
    });
  }

  // Remover medicamento da lista
  removerAprazamento(index: number) {
    this.aprazamentos.splice(index, 1);
  }

}
