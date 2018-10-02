import { ProntuariosComponent } from './components/prontuarios/prontuarios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProntuarioComponent } from './components';

const routes: Routes = [
  {
    path: '', component: ProntuariosComponent
  },
  { path: 'prontuarios', children: [
    { path: ':id', component: ProntuarioComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
