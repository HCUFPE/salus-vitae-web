import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { AprazamentosService } from '../aprazamentos.service';
import { Aprazamento } from '../../../models/aprazamento.model';
import { PreOperacao } from 'src/app/models/pre-operacao.model';

@Component({
  selector: 'app-listar-aprazamentos',
  templateUrl: './listar-aprazamentos.component.html',
  styleUrls: ['./listar-aprazamentos.component.css']
})
export class ListarAprazamentosComponent implements OnInit {

  aprazamentos: PreOperacao[] = [];
  filtro: string;

  constructor(private aprazamentosService: AprazamentosService) { }

  ngOnInit() {
    this.aprazamentosService.aprazamentos()
    .subscribe(aprazamentos => {
      this.aprazamentos = aprazamentos;

      // this.aprazamentos.push({ _id: '2322232', paciente: { _id: '329090', nome: '434332', sexo: 'M',
      // numeroRg: '', numeroCpf: '', nomeMae: '', nomePai: '', alergias: [] },
      // horario: new Date(2016, 9, 17, 20, 30, 0, 0),
      // enfermeira: { _id: '44343', name: '', email: '', cpf: '', accesToken: '' },
      // medicamento: { _id: '3232', nome: 'teste', dosagem: '3', dataFabricacao: '', dataValidade: new Date(2016, 9, 17, 20, 30, 0, 0) },
      // isConsumido: false, intervalo: '2', isCancelado: false });

      // this.aprazamentos.push({ _id: '2322232', paciente: { _id: '329090', nome: '434332', sexo: 'M',
      // numeroRg: '', numeroCpf: '', nomeMae: '', nomePai: '', alergias: [] },
      // horario: new Date(2016, 9, 17, 20, 29, 0, 0),
      // enfermeira: { _id: '44343', name: '', email: '', cpf: '', accesToken: '' },
      // medicamento: { _id: '3232', nome: 'teste', dosagem: '3', dataFabricacao: '', dataValidade: new Date(2016, 9, 17, 20, 30, 0, 0) },
      // isConsumido: false, intervalo: '2', isCancelado: false });
    });
  }

  getAprazamentos(value: string) {
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
