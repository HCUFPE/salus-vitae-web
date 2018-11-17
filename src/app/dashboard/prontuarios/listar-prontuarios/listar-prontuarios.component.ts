import { Ala } from './../../../models/ala.model';
import { Component, OnInit } from '@angular/core';

import { Prontuario } from '../../../models/prontuario.model';
import { ProntuariosService } from '../prontuarios.service';

@Component({
  selector: 'app-listar-prontuarios',
  templateUrl: './listar-prontuarios.component.html',
  styleUrls: ['./listar-prontuarios.component.css']
})
export class ListarProntuariosComponent implements OnInit {
  prontuario: Prontuario[];
  ala: Ala[];
  filtro: string;

  constructor(private prontuarioService: ProntuariosService) { }

  ngOnInit() {
    this.prontuarioService.prontuarios()
    .subscribe(prontuario => (this.prontuario = prontuario));
    this.getAlas();
  }

  getAlergias(prontuario: Prontuario) {
    return prontuario.idPaciente.alergias.map(a => a['descricao']).join(', ');
  }

  getAlas() {
   this.prontuarioService.alas()
   .subscribe(ala => (
     this.ala = ala));
  }

  getProntuarios(value: string) {
    return this.prontuario && this.filtro ?
    this.prontuario.filter(p => p.idPaciente.nome.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase()) ||
    p.idPaciente.numeroCpf.includes(this.filtro)) : this.prontuario;
  }

}
