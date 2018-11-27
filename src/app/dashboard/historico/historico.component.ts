import { Component, OnInit } from '@angular/core';
import { Prontuario } from '../../models/prontuario.model';
import { Consumo } from '../../models/consumo.model';
import { Aprazamento } from 'src/app/models/aprazamento.model';
import { ActivatedRoute } from '@angular/router';
import { HistoricoService } from './historico.service';
import { AprazamentosService } from '../aprazamentos/aprazamentos.service';
import { PreOperacao } from '../../models/pre-operacao.model';
import { Operacao } from '../../models/operacao.model';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  public dtOpera: Array<any>=[];
  public dtList:Array<Operacao>=[];
  public idOperacao;
  public operacao:PreOperacao;
  public modalConsumo: Consumo;
  public filtro: string;
  constructor(private route: ActivatedRoute,private historicoService: HistoricoService) { }

  ngOnInit() {
    this.getHistorico();
  }

  getHistorico(){
    this.historicoService.historicoConsumo().subscribe(historico=>{
      this.operacao
      this.dtList = historico.filter(a=>a.isConsumido)
      this.getPreOperacao(this.dtList);
    });
  }

  getPreOperacao(opList){
      
  }

}
