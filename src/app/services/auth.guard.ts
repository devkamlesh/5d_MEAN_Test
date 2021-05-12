import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UserService, private router: Router) { }
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
}
