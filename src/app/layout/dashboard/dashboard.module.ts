import { PacientesService } from './components/pacientes/pacientes.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent,
    PacienteComponent,
    PacientesComponent
} from './components';
import { StatModule } from '../../shared';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        StatModule,
        HttpModule
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
