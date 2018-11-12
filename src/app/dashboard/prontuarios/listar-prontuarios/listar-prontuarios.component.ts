import { Component, OnInit } from '@angular/core';

import { Prontuario } from '../../../models/prontuario.model';
import { ProntuariosService } from '../prontuarios.service';

@Component({
  selector: 'app-listar-prontuarios',
  templateUrl: './listar-prontuarios.component.html',
  styleUrls: ['./listar-prontuarios.component.css']
})
export class ListarProntuariosComponent implements OnInit {
  prontuarios: Prontuario[];
  filtro: string;

  constructor(private prontuarioService: ProntuariosService) { }

  ngOnInit() {
    this.prontuarioService.prontuarios()
    .subscribe(prontuarios => (this.prontuarios = prontuarios));
  }

  // getAlergias(prontuario: Prontuario) {
  //   return prontuario.idPaciente.alergias.map(a => a['descricao']).join(', ');
  // }

  getProntuarios(value: string) {
    return this.prontuarios && this.filtro ?
    this.prontuarios.filter(p => p.prontuario) : this.prontuarios;
  }
}
