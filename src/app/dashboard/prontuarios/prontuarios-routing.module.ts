import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrescricaoComponent } from './prescricao/prescricao.component';

import { ListarProntuariosComponent } from './listar-prontuarios/listar-prontuarios.component';

const routes: Routes = [
  { path: ':id', component: PrescricaoComponent },
  { path: ':prontuario_id/atendimento/:atendimento_id', component: PrescricaoComponent },
  { path: '', component: ListarProntuariosComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProntuariosRoutingModule { }
