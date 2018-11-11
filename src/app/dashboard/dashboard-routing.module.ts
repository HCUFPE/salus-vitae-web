import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HistoricoComponent } from './historico/historico.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'prontuarios', loadChildren: './prontuarios/prontuarios.module#ProntuariosModule' },
      { path: 'aprazamentos', loadChildren: './aprazamentos/aprazamentos.module#AprazamentosModule' },
      { path:'historico',component:HistoricoComponent },
      { path: '', redirectTo: 'prontuarios', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
