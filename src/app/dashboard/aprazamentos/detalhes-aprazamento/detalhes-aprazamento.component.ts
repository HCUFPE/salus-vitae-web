import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, Output, EventEmitter, Input } from '@angular/core';
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
  mov: String = 'Motivo';
  public suspensao: String="";
  rsusp:any="";
  isActive: boolean=false;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private route: ActivatedRoute,
    private aprazamentoService: AprazamentosService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.aprazamentoService.aprazamentosById(this.route.snapshot.params['id'])
      .subscribe((aprazamento: Aprazamento) => this.aprazamento = aprazamento);
    document.getElementById('jt-suspensao').style.display = "none";
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

  motivo() {
    
    this.isActive=true;
    document.getElementById('jt-suspensao').style.display = "block";
    this.mov = "Salvar";
    //let just = (document.getElementById("suspensao") as HTMLInputElement).value;
    if (this.suspensao.length > 0) {

      if (confirm("Deseja salvar a suspensão?")) {
        
        this.toastr.success('Aprazamento justificado', 'Successo!')
          .then((toast: Toast) => {
            setTimeout(() => {
              this.suspensao="";
              this.toastr.dismissToast(toast);
            }, 1500);
        });

        this.isActive=false;
        this.mov = "Motivo";
        document.getElementById('jt-suspensao').style.display = "none";
        this.rsusp = "- "+this.suspensao;
      }
    }
  }

  cancel(){
    this.mov="Motivo";
    this.isActive=false;
    
    this.toastr.custom('<span style="color: red"><strong>Operação Cancelada!<strong></span>', null, { enableHTML: true })
        .then((toast: Toast) => {
          setTimeout(() => {
            this.toastr.dismissToast(toast);
          }, 2000);
    });
    
    document.getElementById('jt-suspensao').style.display = "none";
    (document.getElementById("suspensao") as HTMLInputElement).value = "";
  }

}
