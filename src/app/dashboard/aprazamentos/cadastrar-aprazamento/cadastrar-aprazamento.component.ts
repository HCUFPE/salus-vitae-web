import { Aprazamento } from './../../../models/aprazamento.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-aprazamento',
  templateUrl: './cadastrar-aprazamento.component.html',
  styleUrls: ['./cadastrar-aprazamento.component.css']
})
export class CadastrarAprazamentoComponent implements OnInit {

  aprazamento: Aprazamento;

  constructor() { }

  ngOnInit() {
  }

}
