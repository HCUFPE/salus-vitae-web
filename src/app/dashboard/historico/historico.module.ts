import { HistoricoComponent } from './historico.component';
import { HistoricoRoutingModule } from './historico-routing.module';
import { AprazamentosRoutingModule } from './../aprazamentos/aprazamentos-routing.module';
import { ListarAprazamentosComponent } from './../aprazamentos/listar-aprazamentos/listar-aprazamentos.component';
import { AprazamentosService } from './../aprazamentos/aprazamentos.service';
import { CadastrarAprazamentoComponent } from './../aprazamentos/cadastrar-aprazamento/cadastrar-aprazamento.component';
import { DetalhesAprazamentoComponent } from './../aprazamentos/detalhes-aprazamento/detalhes-aprazamento.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HistoricoRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [DetalhesAprazamentoComponent, HistoricoComponent, ListarAprazamentosComponent, CadastrarAprazamentoComponent],
  providers: [AprazamentosService]

})
export class HistoricoModule { }
