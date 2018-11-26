import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

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
    private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)])
    });
  }

  inputInvalid(value) {
    const formControl: AbstractControl = this.loginForm.controls[value];
    if (formControl.touched && formControl.errors) {
      return Object.keys(formControl.errors);
    }
    return [];
  }


  login() {
    this.loginService.loginHC(this.loginForm.value.username, this.loginForm.value.password).subscribe((usuario: Usuario) => {
      localStorage.setItem('token', usuario.token);
      localStorage.setItem('user', usuario.username);
      this.router.navigate(['dashboard/prontuarios/pacientes-internados']);
    },
      (err) => {
        this.isInvalidLogin = true;
        console.log(err); }
    );
  }
}
