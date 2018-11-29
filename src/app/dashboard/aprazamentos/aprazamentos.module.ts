import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';

import { AprazamentosRoutingModule } from './aprazamentos-routing.module';
import { ListarAprazamentosComponent } from './listar-aprazamentos/listar-aprazamentos.component';
import { AprazamentosService } from './aprazamentos.service';
import { ProntuariosService } from '../prontuarios/prontuarios.service';
import { ListaPreOperacaoPipe } from './listar-aprazamentos/listar-aprazamentos-filter';

@NgModule({
  imports: [
    CommonModule,
    AprazamentosRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({}),
    NgbModule.forRoot()
  ],
  declarations: [ ListarAprazamentosComponent, ListaPreOperacaoPipe],
  providers: [AprazamentosService, ProntuariosService]

})
export class AprazamentosModule { }
