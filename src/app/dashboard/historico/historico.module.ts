import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { HistoricoService } from './historico.service';
import { ListaHistoricoPipe } from './historico-filter';
import { HistoricoComponent } from './historico.component';
import { HistoricoRoutingModule } from './historico-routing.module';
import { DashboardModule } from '../dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HistoricoRoutingModule,
  ],
  declarations: [HistoricoComponent,ListaHistoricoPipe],
  providers: [HistoricoService]

})
export class HistoricoModule { }
