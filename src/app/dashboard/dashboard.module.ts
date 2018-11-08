import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { HistoricoComponent } from './historico/historico.component';

@NgModule({
    imports: [
        CommonModule,
        NgbAlertModule.forRoot(),
        NgbDropdownModule.forRoot(),
        DashboardRoutingModule
    ],
    declarations: [
        DashboardComponent,
        SidebarComponent,
        HeaderComponent,
        HistoricoComponent
    ],
    providers: [AuthGuard]
})
export class DashboardModule {}
