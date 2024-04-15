import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuth = this.authenticationService.isAuthenticated();

    console.log('isAuth: ' + isAuth);
    if (!isAuth) {
      this.router.navigate(['/auth/login']);
    } else {
      return true;
    }
  }
}
