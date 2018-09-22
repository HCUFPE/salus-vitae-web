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

  constructor(private pacienteService: PacientesService) { }

  ngOnInit() {
    this.pacienteService.pacientes()
    .subscribe(pacientes => (this.pacientes = pacientes));
  }

}
