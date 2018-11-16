import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';

import { ToastsManager, Toast } from 'ng6-toastr/ng2-toastr';
import * as moment from 'moment';

import { Medicamento } from '../../../models/medicamento.model';
import { Prontuario } from '../../../models/prontuario.model';
import { AprazamentosService } from '../../aprazamentos/aprazamentos.service';
import { Aprazamento } from 'src/app/models/aprazamento.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-aprazar',
  templateUrl: './modal-aprazar.component.html',
  styleUrls: ['./modal-aprazar.component.css']
})
export class ModalAprazarComponent implements OnInit, OnDestroy {

  aprazamento: Aprazamento;
  dt_horario: string;
  dt_date: Date;
  options:boolean=null;
  @Input() prontuario: Prontuario;
  @Input() medicamento: Medicamento;
  @Output() hideModal: EventEmitter<Aprazamento> = new EventEmitter();
  @ViewChild('btnClose') btnClose: ElementRef;

  constructor(private aprazamentoService: AprazamentosService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
  }

  getNomeRemedio() {
    if (this.medicamento) {
      let nome: string = this.medicamento.nome;

      if (this.medicamento.dosagem) {
        nome += ` - ${this.medicamento.dosagem}`;
      }

      // if (this.medicamento.frequencia) {
      //   nome += ` - ${this.medicamento.frequencia}h/${this.medicamento.frequencia}`;
      // }

      return nome;
    }

    return 'Não identificado';
  }

  close(loginForm:NgForm) {
    loginForm.reset();
    //this.hideModal.emit(this.aprazamento); 
  }

  confirmar() {
    
    const hr = this.dt_horario.toString().trim();
    const regex = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
    const dt_aprazamento= this.dt_date.toString().trim();
    const now = moment();
    const before = moment().add(-1,'days');
    let date = moment(dt_aprazamento);
    const dateAfter = moment().add(1, 'days');

    if (hr.length === 0 || hr.length === undefined) {
      alert('Horário inicial campo obrigatório!');
    } else if (regex.test(hr) === false) {
      alert('Horário Inválido');
    }else if (dt_aprazamento.length === 0 || dt_aprazamento === undefined) {
      alert('Data inicial campo obrigatório!');
    } else if (!date.isValid() || date.isBefore(before) || date.isAfter(dateAfter)) {
      alert('Data Inválida');
    } else {
      if (confirm('Você tem certeza sobre o aprazamento?\n\n' + 'Data Aprazado: ' + this.dt_date + '\nHorário Aprazada: ' + this.dt_horario)) {
        this.aprazamento = { _id: now.unix().toString(), paciente: this.prontuario.idPaciente,
            horario: now.toDate(), enfermeira: null, medicamento: this.medicamento, isConsumido: false,
            intervalo: null, isCancelado: false };
        this.aprazamentoService.aprazar(this.aprazamento)
        .subscribe((res: boolean) => {
          if (res) {
            this.toastr.success('Aprazamento registrado', 'Successo!')
            .then((toast: Toast) => {
              setTimeout(()=>{
                this.btnClose.nativeElement.click();
                this.toastr.dismissToast(toast);
              },1500);
            });
          } else {
            this.toastr.error('Erro ao aprazar', 'Não foi possível realizar o aprazamento.');
            this.aprazamento = null;
          }
        }, () => {
          this.toastr.error('Erro ao aprazar', 'Não foi possível realizar o aprazamento.');
          this.aprazamento = null;
        });
        
      }
    }
    
  }

  isRequesting(): boolean {
    return this.aprazamento !== undefined && this.aprazamento !== null;
  }

  ngOnDestroy() {
    this.btnClose.nativeElement.click();
  }

}
