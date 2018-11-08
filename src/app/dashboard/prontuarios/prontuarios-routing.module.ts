import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProntuarioComponent } from './prontuario/prontuario.component';
import { ListarProntuariosComponent } from './listar-prontuarios/listar-prontuarios.component';

const routes: Routes = [
  { path: ':id', component: ProntuarioComponent },
  // { path: ':prontuario_id/:atendimento_id', component: ProntuarioComponent },
  { path: '', component: ListarProntuariosComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProntuariosRoutingModule { }
