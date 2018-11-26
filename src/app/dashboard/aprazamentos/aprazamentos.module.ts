import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AprazamentosRoutingModule } from './aprazamentos-routing.module';
import { ListarAprazamentosComponent } from './listar-aprazamentos/listar-aprazamentos.component';
import { AprazamentosService } from './aprazamentos.service';

@NgModule({
  imports: [
    CommonModule,
    AprazamentosRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule

  ],
  declarations: [ListarAprazamentosComponent],
  providers: [AprazamentosService]

})
export class AprazamentosModule { }
