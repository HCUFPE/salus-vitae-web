import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProntuariosRoutingModule } from './prontuarios-routing.module';
import { ProntuariosComponent } from './prontuarios.component';
import { ProntuarioComponent } from './prontuario/prontuario.component';
import { FormsModule } from '@angular/forms';
import { ModalAprazarComponent } from './modal-aprazar/modal-aprazar.component';

@NgModule({
  imports: [
    CommonModule,
    ProntuariosRoutingModule
  ],
  declarations: [ProntuariosComponent, ProntuarioComponent, ModalAprazarComponent]
})
export class ProntuariosModule { }
