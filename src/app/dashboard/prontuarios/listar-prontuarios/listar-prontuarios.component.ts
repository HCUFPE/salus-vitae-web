import { Leito } from './../../../models/leito.model';
import { Alert } from './../../../shared/errorhandling/index';
import { Ala } from './../../../models/ala.model';
import { Component, OnInit, Input, Pipe, Injectable } from '@angular/core';

import { Prontuario } from '../../../models/prontuario.model';
import { ProntuariosService } from '../prontuarios.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-listar-prontuarios',
  templateUrl: './listar-prontuarios.component.html',
  styleUrls: ['./listar-prontuarios.component.css']
})

@Injectable()
export class ListarProntuariosComponent implements OnInit {
  public prontuario: Prontuario;
  public ala: Ala[] = [];
  public filtro: string;
  public leito: Leito[];
  public pacientes: Leito[];
  public pacientesInternados: any;
  public newObj: Array<any> = [];
  @Input() public alerts: Array<Alert> = [];


  constructor(
    private prontuarioService: ProntuariosService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.getAlas();
  }

  getAlas() {
    this.prontuarioService.alas()
      .subscribe(ala => {

        this.ala.push(ala);
        this.leito = ala.leitos;

        for (const leito of ala.leitos) {
          const numeroLeito = leito;
          const numeroProntuario = leito.prontuario;
          if (numeroProntuario) {
            this.getProntuariosHC(numeroProntuario, numeroLeito);
          }
        }
        return this.newObj;
      }, error => {
        const alert = new Alert(null, error);
        this.alerts.push(alert);
      });
  }

  getProntuariosHC(prontuario: number, leito: any) {
    this.prontuarioService.listarProntuariosHC(prontuario).subscribe(data => {
      this.prontuario = data;
      const numeroLeito = this.ala;
      this.newObj.push(Object.assign({}, this.prontuario, leito));
    });
  }
}
