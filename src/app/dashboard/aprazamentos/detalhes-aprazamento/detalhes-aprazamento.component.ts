import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { ToastsManager, Toast } from 'ng6-toastr/ng2-toastr';

import { AprazamentosService } from '../aprazamentos.service';
import { Aprazamento } from './../../../models/aprazamento.model';


@Component({
  selector: 'app-detalhes-aprazamento',
  templateUrl: './detalhes-aprazamento.component.html',
  styleUrls: ['./detalhes-aprazamento.component.css']
})
export class DetalhesAprazamentoComponent implements OnInit {

  aprazamento: Aprazamento;
  dt_horario: Date;
  submitType: String = 'Editar';

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private route: ActivatedRoute,
    private aprazamentoService: AprazamentosService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.aprazamentoService.aprazamentosById(this.route.snapshot.params['id'])
      .subscribe((aprazamento: Aprazamento) => this.aprazamento = aprazamento);
  }

  editar(input: HTMLInputElement) {
    if (input.disabled) {
      this.submitType = 'Salvar';
    } else if (this.submitType === 'Salvar') {

      if (confirm('Deseja atualizar o aprazamento?')) {
        this.toastr.success('Aprazamento atualizado', 'Salvo!')
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 1500);
         });
         this.submitType = 'Editar';
      } else {
        input.disabled = !input.disabled;
      }
    }
    input.disabled = !input.disabled;
  }

  excluir() {
    if (confirm('Deseja excluir o aprazamento?')) {
      this.toastr.success('Aprazamento excluído', 'Successo!')
        .then((toast: Toast) => {
          setTimeout(() => {
            window.history.go(-1);
            this.toastr.dismissToast(toast);
          }, 1500);
        });
    } else {
      this.toastr.custom('<span style="color: red"><strong>Operação Cancelada!<strong></span>', null, { enableHTML: true })
        .then((toast: Toast) => {
          setTimeout(() => {
            this.toastr.dismissToast(toast);
          }, 2000);
        });
    }
  }

}
