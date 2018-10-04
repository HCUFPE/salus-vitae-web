import { Http, HttpModule } from '@angular/http';
import { LoginService } from './login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { InputComponent } from '../shared';
import { NotificationService } from '../shared/messages/notification.service';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, HttpModule],
    declarations: [LoginComponent, InputComponent],
    exports: [ReactiveFormsModule],
    providers: [
      LoginService,
      NotificationService
    ]
})
export class LoginModule {}
