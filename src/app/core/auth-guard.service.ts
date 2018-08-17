import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    console.log(url);
    // return true;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    console.log(this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) {
      return true;
    }

    // Guarda la URL para redireccionar después del login
    this.authService.redirectUrl = url;

    this.router.navigate(['/welcome/login']);
    return false;
  }
}
