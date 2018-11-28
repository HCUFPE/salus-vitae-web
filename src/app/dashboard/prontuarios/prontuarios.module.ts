import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxMaskModule } from 'ngx-mask';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProntuariosRoutingModule } from './prontuarios-routing.module';
import { PrescricaoComponent } from './prescricao/prescricao.component';
import { ModalAprazarComponent } from './modal-aprazar/modal-aprazar.component';
import { ModalRodelagemAprazamentoComponent } from '../modal-rodelagem-aprazamento/modal-rodelagem-aprazamento.component';

import { ProntuariosService } from './prontuarios.service';
import { ListarProntuariosComponent } from './listar-prontuarios/listar-prontuarios.component';

import { AprazamentosService } from '../aprazamentos/aprazamentos.service';
import { ListaProntuariosPipe } from './listar-prontuarios/lista-prontuario-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    ProntuariosRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TranslateModule,
    NgxMaskModule.forChild(),
    NgxPaginationModule,
    NgxLoadingModule.forRoot({}),
    NgbModule.forRoot()
  ],
  declarations: [
    ListarProntuariosComponent,
    PrescricaoComponent,
    ModalAprazarComponent,
    ModalRodelagemAprazamentoComponent,
    ListaProntuariosPipe
  ],
  entryComponents: [
    ModalAprazarComponent,
    ModalRodelagemAprazamentoComponent
  ],
  providers: [
    ProntuariosService,
    AprazamentosService,
    TranslateModule,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'pt-BR'}
  ]
})
export class ProntuariosModule { }
