import { Leito } from './../../../models/leito.model';
import { Alert } from './../../../shared/errorhandling/index';
import { Ala } from './../../../models/ala.model';
import { Component, OnInit, Input, Pipe } from '@angular/core';

import { Prontuario } from '../../../models/prontuario.model';
import { ProntuariosService } from '../prontuarios.service';
import { TranslateService } from '@ngx-translate/core';

@Pipe({  
  name: 'myfilter',  
})  

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
  public pacientes: Leito[];
  public pacientesInternados: any;
  public newObj: Array<any>=[];
  @Input() public alerts: Array<Alert> = [];

  
  constructor(
    private prontuarioService: ProntuariosService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.getAlas();
    // this.getProntuariosHC();
    // this.getPacientesInternados('');
  }

  getAlas() {
    this.prontuarioService.alas()
      .subscribe(ala => {
        this.ala = ala;
        this.leito = ala.leitos;

        for (const leito of ala.leitos) {
          let numeroLeito = leito;
          let numeroProntuario = leito.prontuario;
          if (numeroProntuario) {
            this.getProntuariosHC(numeroProntuario,numeroLeito);
          }
        }
        console.log(this.newObj);
        return this.newObj;
      }, error => {
        const alert = new Alert(null, error);
        this.alerts.push(alert);
      });
  }

  getProntuariosHC(prontuario: number,leito:any) {
    this.prontuarioService.listarProntuariosHC(prontuario).subscribe(data => {
      this.prontuario = data;
      this.newObj.push(Object.assign({},this.prontuario,leito));
    });
  }
  //  getAlas2() {
  //   this.prontuarioService.alas().pipe(
  //     mergeAll().concatMap()
  //   )
  //     .subscribe(ala => {
  //       this.ala = ala;
  //       // console.log(this.ala);
  //       this.pacientes = ala.leitos;
  //       // console.log(this.pacientes);

  //       for (const pacientesInternados of ala.leitos) {
  //         const numerosProntuarios = pacientesInternados;


  //         console.log(pacientesInternados.prontuario);

  //         if (numerosProntuarios.prontuario !== undefined) {
  //           this.prontuarioService.getProntuarioById(numerosProntuarios.prontuario)
  //             .subscribe(data => {
  //               this.pacientesInternados = data;
  //               // console.log(this.pacientesInternados);
  //               const result = Object.assign({}, pacientesInternados, this.ala);
  //               console.log(result);
  //               return result;
  //             });
  //           // }, error => {
  //           //   const alert = new Alert(null, error);
  //           //   this.alerts.push(alert);
  //           // }; )
  //         }
  //       }
  //     });
  // }

}
