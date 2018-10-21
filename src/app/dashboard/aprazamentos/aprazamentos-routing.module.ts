import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesAprazamentoComponent } from './detalhes-aprazamento/datalhes-aprazamento.component';
import { ListarAprazamentosComponent } from './listar-aprazamentos/listar-aprazamentos.component';

const routes: Routes = [
  { path: ':id', component: DetalhesAprazamentoComponent },
  { path: '', component: ListarAprazamentosComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprazamentosRoutingModule { }
