import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { AprazamentosService } from '../aprazamentos.service';
import { Aprazamento } from '../../../models/aprazamento.model';
import { PreOperacao } from 'src/app/models/pre-operacao.model';
import { Prontuario } from '../../../models/prontuario.model';

@Component({
  selector: 'app-listar-aprazamentos',
  templateUrl: './listar-aprazamentos.component.html',
  styleUrls: ['./listar-aprazamentos.component.css']
})
export class ListarAprazamentosComponent implements OnInit {

  public aprazamentos: PreOperacao[] = [];
  public apraList: Array<any> = [];
  public prontuario: Prontuario[];
  filtro: string;
  paginationAprazamento = 1;

  constructor(private aprazamentosService: AprazamentosService) { }

  ngOnInit() {
    this.getAprazamentos();
  }

  getAprazamentos(value?: string) {
    this.aprazamentosService.aprazamentos()
      .subscribe(aprazamento => {
        this.apraList = aprazamento;
        console.log(this.apraList);
      });
    /*return this.aprazamentos.filter(a => !a.isConsumido).sort((a: Aprazamento, b: Aprazamento) => {
        if (new Date(a.horario) < new Date(b.horario)) {
          return -1;
        }

        if (new Date(a.horario) > new Date(b.horario)) {
          return 1;
        }

        return 0;
      }
    );*/
  }

}
