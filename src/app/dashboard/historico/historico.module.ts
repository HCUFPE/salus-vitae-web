import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListaHistoricoPipe } from './historico-filter';
import { HistoricoComponent } from './historico.component';
import { HistoricoRoutingModule } from './historico-routing.module';
import { HistoricoService } from './historico.service';
import { AprazamentosService } from '../aprazamentos/aprazamentos.service';
import { ProntuariosService } from '../prontuarios/prontuarios.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HistoricoRoutingModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({}),
    NgbModule.forRoot()
  ],
  declarations: [HistoricoComponent, ListaHistoricoPipe],
  providers: [HistoricoService, AprazamentosService, ProntuariosService]

})
export class HistoricoModule { }
