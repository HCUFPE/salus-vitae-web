import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { AprazamentosService } from '../aprazamentos.service';
import { Aprazamento } from '../../../models/aprazamento.model';

@Component({
  selector: 'app-listar-aprazamentos',
  templateUrl: './listar-aprazamentos.component.html',
  styleUrls: ['./listar-aprazamentos.component.css']
})
export class ListarAprazamentosComponent implements OnInit {

  aprazamentos: Aprazamento[] = [];
  filtro: string;

  constructor(private aprazamentosService: AprazamentosService) { }

  ngOnInit() {
    this.aprazamentosService.aprazamentos()
      .subscribe(aprazamentos => {
        this.aprazamentos = aprazamentos;

        this.aprazamentos.push({
          _id: '2322232',
          horario: new Date(2016, 9, 17, 20, 30, 0, 0),
          enfermeira: {  username: '', password: '' },
          isConsumido: false,
          intervalo: '2',
          isCancelado: false,
          justificativa: '',
        });

        this.aprazamentos.push({
          _id: '2322232',
          horario: new Date(2016, 9, 17, 20, 30, 0, 0),
          enfermeira: {  username: '', password: '' },
          isConsumido: false,
          intervalo: '2',
          isCancelado: false,
          justificativa: '',
        });
      });
  }

  getAprazamentos(value: string) {
    return this.aprazamentos.filter(a => !a.isConsumido).sort((a: Aprazamento, b: Aprazamento) => {
      if (new Date(a.horario) < new Date(b.horario)) {
        return -1;
      }

      if (new Date(a.horario) > new Date(b.horario)) {
        return 1;
      }

      return 0;
    }
    );
  }

}
