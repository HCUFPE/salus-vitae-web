import { NotificationService } from './../shared/messages/notification.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { routerTransition } from '../router.animations';

import { LoginService } from './login.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usuario: Usuario[];
  usuarioLogando: Usuario;
  isInvalidLogin: boolean;

  constructor(public router: Router,
              private fb: FormBuilder,
              private loginService: LoginService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      id: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z]+$/)]),
      senha: this.fb.control('', [Validators.required, Validators.minLength(6)])
    });
    this.loginService.usuarios()
    .subscribe(usuario => (this.usuario = usuario));
  }

  inputInvalid(value) {
    const formControl: AbstractControl = this.loginForm.controls[value];

    if (formControl.touched && formControl.errors) {
      return Object.keys(formControl.errors);
    }

    return [];
  }

  // verificarExistencia(id: string, cpf: string, list: Usuario[]) {
  //   return list.filter(u => u._id === id && u.cpf === cpf).length > 0;
  // }

  login() {
    if (this.loginForm.value.id === 'enfermeira' && this.loginForm.value.senha === '123456') {
      this.notificationService.notify(`Bem vindo, ${this.loginForm.value.id}`);
      localStorage.setItem('isLoggedin', 'enfermeira');
      this.router.navigate(['dashboard']);
    } else {
      this.isInvalidLogin = true;
    }
    // if (this.verificarExistencia(this.loginForm.value.id, this.loginForm.value.cpf, this.usuario)) {
    //     this.loginService.login(this.loginForm.value.id, this.loginForm.value.cpf)
    //       .subscribe(usuario => this.notificationService.notify(`Bem vindo, ${usuario.name}`),
    //       response => // HttpErrorResponse
    //         this.notificationService.notify(response.error.message));
    // }

    // this.loginService.login(this.loginForm.value.id, this.loginForm.value.cpf)
    // .subscribe(usuario =>
    //                     this.notificationService.notify(`Bem vindo, ${usuario.name}`),
    //                     response => // HttpErrorResponse
    //                     this.notificationService.notify(response.error.message));
  }

}
