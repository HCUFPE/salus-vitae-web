import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, HttpClientModule],
    declarations: [LoginComponent],
    providers: [
      LoginService
    ]
})
export class LoginModule {}
