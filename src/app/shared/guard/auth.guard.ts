import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('isLoggedin') && state.url === '/login') {
      // if user is logged and trying access login, then redirect to main page
      this.router.navigate(['/dashboard']);
      return false;
    } else if (!localStorage.getItem('isLoggedin') && state.url !== '/login') {
      // if user is not logged, then redirect to login page
      this.router.navigate(['/login']);
      return false;
    }

    return true;
    }
}
