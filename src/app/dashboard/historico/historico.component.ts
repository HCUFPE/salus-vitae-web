import { Component, OnInit } from '@angular/core';
import { Prontuario } from '../../models/prontuario.model';
import { Consumo } from '../../models/consumo.model';
import { Aprazamento } from 'src/app/models/aprazamento.model';
import { ActivatedRoute } from '@angular/router';
import { HistoricoService } from './historico.service';
import { AprazamentosService } from '../aprazamentos/aprazamentos.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  aprazamentos:Aprazamento[];
  modalConsumo:Consumo;
  filtro:string;
  constructor(private route:ActivatedRoute,
   private historicoService:HistoricoService) { }

  ngOnInit() {
  }

}
