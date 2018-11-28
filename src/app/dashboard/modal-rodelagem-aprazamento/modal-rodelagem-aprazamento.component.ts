import { Component, OnInit, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

import { AprazamentosService } from '../aprazamentos/aprazamentos.service';
import { PreOperacao } from '../../models/pre-operacao.model';
import { Operacao } from '../../models/operacao.model';

@Component({
  selector: 'app-modal-rodelagem-aprazamento',
  templateUrl: './modal-rodelagem-aprazamento.component.html',
  styleUrls: ['./modal-rodelagem-aprazamento.component.css']
})
export class ModalRodelagemAprazamentoComponent {

  @Input() aprazamento: PreOperacao;
  public justificativa: string;

  constructor(
    private aprazamentoService: AprazamentosService,
    private translateService: TranslateService,
    public activeModal: NgbActiveModal,
    private toastrService: ToastrService) {
  }

  // Perfom Confirm
  onSubmit() {
    swal({
      title: this.translateService.instant('Cancelar Aprazamento'),
      text: this.translateService.instant('Tem certeza que deseja rodelar?'),
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
        const cancelamento: Operacao = {
          cdPreOperacaoAprazamento: this.aprazamento._id,
          dtOperacao: new Date(),
          isConsumido: false,
          justificativa: this.justificativa,
          nmUsuario: localStorage.getItem('user')
        };

        this.aprazamentoService.rodelagemAprazamento(cancelamento)
          .subscribe(data => {
            this.activeModal.close(data);
          }, () => {
            this.toastrService.error('Não foi possível cancelar o aprazamento!', 'Erro!', { timeOut: 2000 });
          });
      }
    });
  }

}
