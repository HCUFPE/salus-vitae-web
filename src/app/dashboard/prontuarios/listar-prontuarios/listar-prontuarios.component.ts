import { Leito } from './../../../models/leito.model';
import { Alert } from './../../../shared/errorhandling/index';
import { Ala } from './../../../models/ala.model';
import { Component, OnInit, Input } from '@angular/core';

import { Prontuario } from '../../../models/prontuario.model';
import { ProntuariosService } from '../prontuarios.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-listar-prontuarios',
  templateUrl: './listar-prontuarios.component.html',
  styleUrls: ['./listar-prontuarios.component.css']
})

export class ListarProntuariosComponent implements OnInit {
  public prontuario: Prontuario;
  public ala: Ala;
  public filtro: string;
  public leito: Leito[];
  public numerosProntuarios;

  @Input()
  public alerts: Array<Alert> = [];


  constructor(
    private prontuarioService: ProntuariosService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.getAlas();
    // this.getProntuariosHC();
  }

  getAlas() {
    this.prontuarioService.alas()
      .subscribe(ala => {
        this.ala = ala;
        this.leito = ala.leitos;
        console.log(this.ala.leitos[0].prontuario);
        console.log(this.leito);

        for (const leito of ala.leitos) {
          const numerosProntuarios = leito.prontuario;

          console.log(numerosProntuarios);

        }
      }, error => {
        const alert = new Alert(null, error);
        this.alerts.push(alert);
      });
  }

  getProntuariosHC() {
    this.prontuarioService.listarProntuariosHC(this.prontuario.prontuario).subscribe(prontuario => {
      this.prontuario = this.prontuario;
    });
  }
}
