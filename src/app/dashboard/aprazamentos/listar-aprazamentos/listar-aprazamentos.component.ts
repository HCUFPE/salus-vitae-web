import { Component, OnInit } from '@angular/core';

import { ngxLoadingAnimationTypes } from 'ngx-loading';
import * as moment from 'moment';

import { AprazamentosService } from '../aprazamentos.service';
import { PreOperacao } from '../../../models/pre-operacao.model';

@Component({
  selector: 'app-listar-aprazamentos',
  templateUrl: './listar-aprazamentos.component.html',
  styleUrls: ['./listar-aprazamentos.component.css']
})
export class ListarAprazamentosComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = true;
  public aprazamentos: Map<number, { isCollapsed: boolean , aprazamentos: PreOperacao[]}> = new Map();
  public paginationAprazamentos = 1;
  public filtro = 'Sem filtro';

  constructor(private aprazamentosService: AprazamentosService) { }

  ngOnInit() {
    this.aprazamentosService.aprazamentosComDetalhes(null, true)
    .then((aprazamentos: PreOperacao[]) => {
      aprazamentos.forEach(aprazamento => {
        if (this.aprazamentos.has(aprazamento.cdProntuario)) {
          this.aprazamentos.get(aprazamento.cdProntuario).aprazamentos.push(aprazamento);
        } else {
          this.aprazamentos.set(aprazamento.cdProntuario, { isCollapsed: true , aprazamentos: [aprazamento] });
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

}
