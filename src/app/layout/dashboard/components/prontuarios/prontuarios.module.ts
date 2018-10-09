import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProntuariosRoutingModule } from './prontuarios-routing.module';
import { ProntuariosComponent } from './prontuarios.component';
import { ProntuarioComponent } from './prontuario/prontuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalAprazarComponent } from './modal-aprazar/modal-aprazar.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    ProntuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ],
  declarations: [ProntuariosComponent, ProntuarioComponent, ModalAprazarComponent]
})
export class ProntuariosModule { }
