import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxMaskModule } from 'ngx-mask';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ProntuariosRoutingModule } from './prontuarios-routing.module';
import { PrescricaoComponent } from './prescricao/prescricao.component';
import { ModalAprazarComponent } from './modal-aprazar/modal-aprazar.component';
import { ModalRodelagemAprazamentoComponent } from './../modal-rodelagem-aprazamento/modal-rodelagem-aprazamento.component';

import { ProntuariosService } from './prontuarios.service';
import { ListarProntuariosComponent } from './listar-prontuarios/listar-prontuarios.component';

import { AprazamentosService } from '../aprazamentos/aprazamentos.service';
import { TranslateModule } from '@ngx-translate/core';
import { ListaProntuariosPipe } from './listar-prontuarios/lista-prontuario-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    ProntuariosRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    TranslateModule,
    NgxMaskModule.forChild(),
    NgxPaginationModule
  ],

  declarations: [
    ListarProntuariosComponent,
    PrescricaoComponent,
    ModalAprazarComponent,
    ModalRodelagemAprazamentoComponent,
    ListaProntuariosPipe
  ],
  providers: [
    ProntuariosService,
    AprazamentosService,
    TranslateModule
  ]
})
export class ProntuariosModule { }
