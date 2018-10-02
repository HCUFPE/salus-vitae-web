import { Component, OnInit } from '@angular/core';

import { ProntuariosService } from './prontuarios.service';
import { Prontuario } from '../../../../models/prontuario.model';

@Component({
  selector: 'app-prontuarios',
  templateUrl: './prontuarios.component.html',
  styleUrls: ['./prontuarios.component.css']
})
export class ProntuariosComponent implements OnInit {
  prontuario: Prontuario[];
  filtro: string;

  constructor(private prontuarioService: ProntuariosService) { }

  ngOnInit() {
    this.prontuarioService.prontuarios()
    .subscribe(prontuario => (this.prontuario = prontuario));
  }

  getAlergias(prontuario: Prontuario) {
    return prontuario.idPaciente.alergias.map(a => a['descricao']).join(', ');
  }

  getProntuarios(value: string) {
    return this.prontuario && this.filtro ?
    this.prontuario.filter(p => p.idPaciente.nome.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase()) ||
    p.idPaciente.numeroCpf.includes(this.filtro)) : this.prontuario;
  }

}
