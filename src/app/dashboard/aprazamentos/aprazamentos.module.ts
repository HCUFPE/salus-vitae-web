import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AprazamentosRoutingModule } from './aprazamentos-routing.module';
import { DetalhesAprazamentoComponent } from './detalhes-aprazamento/datalhes-aprazamento.component';
import { ListarAprazamentosComponent } from './listar-aprazamentos/listar-aprazamentos.component';
import { AprazamentosService } from './aprazamentos.service';
import { CadastrarAprazamentoComponent } from './cadastrar-aprazamento/cadastrar-aprazamento.component';

@NgModule({
  imports: [
    CommonModule,
    AprazamentosRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DetalhesAprazamentoComponent, ListarAprazamentosComponent, CadastrarAprazamentoComponent],
  providers: [AprazamentosService]

})
export class AprazamentosModule { }
