import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProntuariosService } from './components/prontuarios/prontuarios.service';
import {
    NotificationComponent,
    ProntuarioComponent,
    ProntuariosComponent
} from './components';
import { StatModule } from '../../shared';
import { MedicamentosService } from './components/prontuarios/medicamentos.service';
import { ModalAprazarComponent } from './components/prontuarios/modal-aprazar/modal-aprazar.component';

@NgModule({
    imports: [
        CommonModule,
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        StatModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        DashboardComponent,
        NotificationComponent,
        ProntuarioComponent,
        ProntuariosComponent,
        ModalAprazarComponent
    ],
    providers: [
      ProntuariosService,
      MedicamentosService
    ]
})
export class DashboardModule {}
