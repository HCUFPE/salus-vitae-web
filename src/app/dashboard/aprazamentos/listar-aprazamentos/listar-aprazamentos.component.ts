import { Component, OnInit } from '@angular/core';

import { AprazamentosService } from '../aprazamentos.service';
import { PreOperacao } from 'src/app/models/pre-operacao.model';

@Component({
  selector: 'app-listar-aprazamentos',
  templateUrl: './listar-aprazamentos.component.html',
  styleUrls: ['./listar-aprazamentos.component.css']
})
export class ListarAprazamentosComponent implements OnInit {

  public aprazamentos: PreOperacao[] = [];
  public apraList: Array<any> = [];
  public dtList: Array<any> = [];
  aprazamentoSelected: PreOperacao;
  lastDate: Date = null;
  filtros: string;
  paginationHorario = 1;

  constructor(private aprazamentosService: AprazamentosService) { }

  ngOnInit() {
    this.getAprazamentos();
  }

  getAprazamentos() {
    this.aprazamentosService.aprazamentos()
    .subscribe(aprazamento => {
      this.apraList = aprazamento.filter(a => a.status);
      this.getDtAprazamento(this.apraList);
  });
    /*
    return this.aprazamentos.filter(a => !a.isConsumido).sort((a: Aprazamento, b: Aprazamento) => {
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

  getDtAprazamento(listP) {
    const myMap = new Map();

    for (let i = 0; i < listP.length; i++) {
      myMap.set(listP[i].dtPreOpAprazamento, listP[i]);
    }
    this.dtList.push(Array.from(myMap.values()));

    console.log(this.dtList);
  }

  selecionarAprazamento(dtaprazamento: any) {
    if (!dtaprazamento) {
      return;
    }

    return this.filtros = dtaprazamento;
  }

}
