import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AprazamentosService } from '../aprazamentos.service';
import { Paciente } from '../../../models/paciente.model';
import { Medicamento } from '../../../models/medicamento.model';

@Component({
  selector: 'app-detalhes-aprazamento',
  templateUrl: './detalhes-aprazamento.component.html',
  styleUrls: ['./detalhes-aprazamento.component.css']
})
export class DetalhesAprazamentoComponent implements OnInit {

  paciente: Paciente;
  filtro: string;
  medicamento: Medicamento;

  constructor(private route: ActivatedRoute, private aprazamentorioService: AprazamentosService) {}

  ngOnInit() {
  }

}
