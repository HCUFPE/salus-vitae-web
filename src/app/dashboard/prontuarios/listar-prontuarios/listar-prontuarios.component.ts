import { Component, OnInit, Input, Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Alert } from '../../../shared/errorhandling/index';
import { Ala } from '../../../models/ala.model';
import { Leito } from '../../../models/leito.model';
import { ProntuariosService } from '../prontuarios.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-listar-prontuarios',
  templateUrl: './listar-prontuarios.component.html',
  styleUrls: ['./listar-prontuarios.component.css']
})

@Injectable()
export class ListarProntuariosComponent implements OnInit {
  public ala: Ala;
  public filtro: string;
  public loading = true;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  paginationPaciente = 1;
  @Input() public alerts: Array<Alert> = [];
  constructor(
    private prontuarioService: ProntuariosService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.getAlas();
  }

  getAlas() {
    this.prontuarioService.resolvedPacientesInternados()
      .then(ala => {
        this.ala = ala;
        this.loading = false;
      }).catch(error => {
        const alert = new Alert(null, error);
        this.alerts.push(alert);
        this.loading = false;
      });
  }

  getLeitos() {
    if (!this.ala || !this.ala.leitos) {
      return [];
    }

    return this.ala.leitos.filter((leito: Leito) => leito.prontuario !== undefined);
  }

}
