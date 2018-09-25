import { PacientesService } from './pacientes.service';
import { Paciente } from './paciente/paciente.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  pacientes: Paciente[];
  filtro: string;
  
  constructor(private pacienteService: PacientesService) { }
  
  ngOnInit() {
    this.pacienteService.pacientes()
    .subscribe(pacientes => (this.pacientes = pacientes));
  }
  
  getAlergias(paciente: Paciente) {
    return paciente.alergias.map(a => a['descricao']).join(', ');
  }
  
  getPacientes(value: string) {
    return this.pacientes && this.filtro ?
    this.pacientes.filter(p => p.nome.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase()) ||
    p.numeroCpf.includes(this.filtro)) : this.pacientes;
  }
  
}
