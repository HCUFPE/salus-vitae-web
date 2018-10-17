import { AprazamentosRoutingModule } from './aprazamentos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AprazamentoComponent } from './aprazamento/aprazamento.component';
import { ListarAprazamentosComponent } from './listar-aprazamentos/listar-aprazamentos.component';

@NgModule({
  imports: [
    CommonModule,
    AprazamentosRoutingModule
  ],
  declarations: [
    AprazamentoComponent,
    ListarAprazamentosComponent
  ],
  exports: [
    AprazamentosRoutingModule
  ]

})
export class AprazamentosModule { }
