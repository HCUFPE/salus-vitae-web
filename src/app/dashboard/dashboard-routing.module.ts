import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'prontuarios/pacientes-internados', loadChildren: './prontuarios/prontuarios.module#ProntuariosModule' },
      { path: 'aprazamentos', loadChildren: './aprazamentos/aprazamentos.module#AprazamentosModule' },
      { path: 'historico', loadChildren: './historico/historico.module#HistoricoModule'  },
      { path: '', redirectTo: 'prontuarios/pacientes-internados', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
