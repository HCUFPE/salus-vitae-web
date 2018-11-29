import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ngxLoadingAnimationTypes } from 'ngx-loading';
import * as moment from 'moment';

import { PreOperacao } from '../../../models/pre-operacao.model';
import { Operacao } from '../../../models/operacao.model';
import { AprazamentosService } from '../aprazamentos.service';
import { ModalRodelagemAprazamentoComponent } from '../../modal-rodelagem-aprazamento/modal-rodelagem-aprazamento.component';

@Component({
  selector: 'app-listar-aprazamentos',
  templateUrl: './listar-aprazamentos.component.html',
  styleUrls: ['./listar-aprazamentos.component.css']
})
export class ListarAprazamentosComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = true;
  public aprazamentos: Map<number, { isCollapsed: boolean, aprazamentos: PreOperacao[] }> = new Map();
  public paginationAprazamentos = 1;
  public filtro = 'Sem filtro';

  constructor(
    private aprazamentosService: AprazamentosService,
    private modalService: NgbModal,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.aprazamentosService.aprazamentosComDetalhes(null, true)
      .then((aprazamentos: PreOperacao[]) => {
        aprazamentos.forEach(aprazamento => {
          if (this.aprazamentos.has(aprazamento.cdProntuario)) {
            this.aprazamentos.get(aprazamento.cdProntuario).aprazamentos.push(aprazamento);
          } else {
            this.aprazamentos.set(aprazamento.cdProntuario, { isCollapsed: true, aprazamentos: [aprazamento] });
          }
        });

        this.loading = false;
      });
  }

  getProntuarios() {
    if (this.filtro !== 'Sem filtro') {
      const prontuarios: Set<number> = new Set();

      this.aprazamentos.forEach((value, key) => {
        if (value.aprazamentos.some(a => this.formatDate(a.horarioInicial) === this.filtro)) {
          prontuarios.add(key);
        }
      });

      return Array.from(prontuarios);
    }

    return Array.from(this.aprazamentos.keys());
  }

  mostrarAprazamentos(prontuario: number) {
    this.aprazamentos.get(prontuario).isCollapsed = !this.aprazamentos.get(prontuario).isCollapsed;
  }

  isCollapsed(prontuario: number) {
    return this.aprazamentos.get(prontuario).isCollapsed;
  }

  getAprazamentos(prontuario: number) {
    if (!this.aprazamentos.has(prontuario)) {
      return [];
    }

    if (this.filtro !== 'Sem filtro') {
      return this.aprazamentos.get(prontuario).aprazamentos.filter(a => this.formatDate(a.horarioInicial) === this.filtro);
    }

    return this.aprazamentos.get(prontuario).aprazamentos;
  }

  getHorarios() {
    const horarios: Set<string> = new Set();

    horarios.add('Sem filtro');
    [].concat(...Array.from(this.aprazamentos.values()).map(a => a.aprazamentos)).forEach(a => {
      horarios.add(this.formatDate(a.horarioInicial));
    });

    return horarios;
  }

  selecionarHorario(horario: string) {
    this.filtro = horario;
  }

  formatDate(date: Date) {
    return moment(date).format('DD/MM/YYYY HH') + 'h';
  }

  public showModalRodelagemAprazamento(prontuario: number, aprazamento: PreOperacao) {
    const modal: NgbModalRef = this.modalService.open(ModalRodelagemAprazamentoComponent,
      { backdrop: 'static', centered: true, keyboard: false, size: 'lg' });
    modal.componentInstance.aprazamento = aprazamento;
    modal.result
      .then((cancelamento: Operacao) => {
        if (this.aprazamentos.get(prontuario).aprazamentos.length > 1) {
          this.aprazamentos.get(prontuario).aprazamentos
          .splice(this.aprazamentos.get(prontuario).aprazamentos.findIndex(a => a._id === cancelamento.cdPreOperacaoAprazamento), 1);
        } else {
          this.aprazamentos.delete(prontuario);
        }

        this.toastrService.success('Aprazamento cancelado com sucesso!', 'Sucesso!', { timeOut: 2000 });
      }).catch(() => null);
  }

}
