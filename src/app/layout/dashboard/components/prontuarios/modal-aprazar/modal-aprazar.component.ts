import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Medicamento } from '../../../../../models/medicamento.model';

@Component({
  selector: 'app-modal-aprazar',
  templateUrl: './modal-aprazar.component.html',
  styleUrls: ['./modal-aprazar.component.css']
})
export class ModalAprazarComponent implements OnInit {

  @Input() medicamento: Medicamento;
  modal: boolean;

  constructor() { }

  ngOnInit() { }

  getNomeRemedio() {
    if (this.medicamento) {
      let nome: string = this.medicamento.nome;

      if (this.medicamento.dosagem) {
        nome += ` - ${this.medicamento.dosagem}`;
      }

      return nome;
    }

    return 'Não identificado';
  }

}
