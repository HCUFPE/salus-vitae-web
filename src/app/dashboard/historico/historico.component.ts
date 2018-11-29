import { Component, OnInit } from '@angular/core';

import { ngxLoadingAnimationTypes } from 'ngx-loading';
import * as moment from 'moment';

import { HistoricoService } from './historico.service';
import { Operacao } from '../../models/operacao.model';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = true;
  public administracoes: Map<string, { isCollapsed: boolean, administracoes: Operacao[] }> = new Map();
  public paginationAdministracoes = 1;
  public filtro: string;

  constructor(private historicoService: HistoricoService) { }

  ngOnInit() {
    this.historicoService.administracoesComDetalhes()
      .then((administracoes: Operacao[]) => {
        administracoes.forEach(administracao => {
          if (this.administracoes.has(this.formatDate(administracao.dtOperacao))) {
            this.administracoes.get(this.formatDate(administracao.dtOperacao)).administracoes.push(administracao);
          } else {
            this.administracoes.set(this.formatDate(administracao.dtOperacao), { isCollapsed: true, administracoes: [administracao] });
          }
        });

        this.loading = false;
      });
  }

  getHorarios() {
    if (this.filtro) {
      const horarios: Set<string> = new Set();

      this.administracoes.forEach((value, key) => {
        if (value.administracoes.some(a => a.aprazamento.prontuario.nomeDoPaciente.toLowerCase().includes(this.filtro.toLowerCase()))) {
          horarios.add(key);
        }
      });

      return this.ordenarCrescente(Array.from(horarios));
    }

    return this.ordenarCrescente(Array.from(this.administracoes.keys()));
  }

  getAdministracoes(horario: string) {
    if (!this.administracoes.has(horario)) {
      return [];
    }

    if (this.filtro) {
      return this.administracoes.get(horario).administracoes
        .filter(a => a.aprazamento.prontuario.nomeDoPaciente.toLowerCase().includes(this.filtro.toLowerCase()));
    }

    return this.administracoes.get(horario).administracoes;
  }

  mostrarAdministracoes(horario: string) {
    this.administracoes.get(horario).isCollapsed = !this.administracoes.get(horario).isCollapsed;
  }

  isCollapsed(horario: string) {
    return this.administracoes.get(horario).isCollapsed;
  }

  selecionarHorario(horario: string) {
    this.filtro = horario;
  }

  formatDate(date: Date) {
    return moment(date).format('DD/MM/YYYY');
  }

  getDateFromString(date: string) {
    return moment(date, 'DD/MM/YYYY');
  }

  ordenarCrescente(arr: string[]) {
    return arr.sort((a: string, b: string) => {
      if (this.getDateFromString(a) > this.getDateFromString(b)) {
        return -1;
      }

      if (this.getDateFromString(a) < this.getDateFromString(b)) {
        return 1;
      }

      return 0;
    });
  }

}
