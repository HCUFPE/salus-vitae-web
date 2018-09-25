import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PacientesService } from './components/pacientes/pacientes.service';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent,
    PacienteComponent,
    PacientesComponent
} from './components';
import { StatModule } from '../../shared';

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
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        PacienteComponent,
        PacientesComponent
    ],
    providers: [
      PacientesService
    ]
})
export class DashboardModule {}
