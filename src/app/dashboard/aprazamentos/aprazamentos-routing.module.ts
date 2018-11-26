import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarAprazamentosComponent } from './listar-aprazamentos/listar-aprazamentos.component';

const routes: Routes = [
  { path: '', component: ListarAprazamentosComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprazamentosRoutingModule { }
