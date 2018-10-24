import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxMaskModule } from 'ngx-mask';

import { ProntuariosRoutingModule } from './prontuarios-routing.module';
import { ProntuarioComponent } from './prontuario/prontuario.component';
import { ModalAprazarComponent } from './modal-aprazar/modal-aprazar.component';
import { ProntuariosService } from './prontuarios.service';
import { MedicamentosService } from './medicamentos.service';
import { ListarProntuariosComponent } from './listar-prontuarios/listar-prontuarios.component';

@NgModule({
  imports: [
    CommonModule,
    ProntuariosRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ],
  declarations: [ListarProntuariosComponent, ProntuarioComponent, ModalAprazarComponent],
  providers: [
    ProntuariosService,
    MedicamentosService
  ]
})
export class ProntuariosModule { }
