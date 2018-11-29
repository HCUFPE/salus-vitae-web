import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { ModalRodelagemAprazamentoComponent } from './modal-rodelagem-aprazamento/modal-rodelagem-aprazamento.component';

@NgModule({
    imports: [
        CommonModule,
        NgbAlertModule.forRoot(),
        NgbDropdownModule.forRoot(),
        DashboardRoutingModule,
        FormsModule
    ],
    declarations: [
        DashboardComponent,
        SidebarComponent,
        HeaderComponent,
        ModalRodelagemAprazamentoComponent
    ],
    entryComponents: [ModalRodelagemAprazamentoComponent],
    providers: [AuthGuard]
})
export class DashboardModule {}
