import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AprazamentosService } from '../aprazamentos.service';
import { Aprazamento } from './../../../models/aprazamento.model';

@Component({
  selector: 'app-detalhes-aprazamento',
  templateUrl: './detalhes-aprazamento.component.html',
  styleUrls: ['./detalhes-aprazamento.component.css']
})
export class DetalhesAprazamentoComponent implements OnInit {

  aprazamento: Aprazamento;

  constructor(private route: ActivatedRoute, private aprazamentoService: AprazamentosService) {}

  ngOnInit() {
    this.aprazamentoService.aprazamentosById(this.route.snapshot.params['id'])
    .subscribe((aprazamento: Aprazamento) => this.aprazamento = aprazamento);
  }

  editar(event: Event, input: HTMLInputElement) {
    if (input.disabled) {
      event.srcElement.innerHTML = 'Salvar';
    } else {
      event.srcElement.innerHTML = 'Editar';
    }

    input.disabled = !input.disabled;
  }

}
