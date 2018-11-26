import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AprazamentosRoutingModule } from './aprazamentos-routing.module';
import { ListarAprazamentosComponent } from './listar-aprazamentos/listar-aprazamentos.component';
import { AprazamentosService } from './aprazamentos.service';
import { CadastrarAprazamentoComponent } from './cadastrar-aprazamento/cadastrar-aprazamento.component';
import { DetalhesAprazamentoComponent } from './detalhes-aprazamento/detalhes-aprazamento.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgPipesModule} from 'ngx-pipes';
import { ListaPreOperacaoPipe } from './listar-aprazamentos/listar-aprazamentos-filter';
@NgModule({
  imports: [
    CommonModule,
    AprazamentosRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgPipesModule
  ],
  declarations: [DetalhesAprazamentoComponent, ListarAprazamentosComponent, CadastrarAprazamentoComponent,ListaPreOperacaoPipe],
  providers: [AprazamentosService]

})
export class AprazamentosModule { }
