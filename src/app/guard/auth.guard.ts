import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService) {
    // *
    }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //     if (this.authService.isLoggedIn()) {
  //       // this.router.navigate(['admin-dashboard/dashboardcontent']);0
  //       return true;
  //     } else {
  //       this.router.navigate(['']);
  //       return false;
  //     }
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('id_token')) {
        // this.router.navigate(['admin-dashboard/dashboardcontent']);0
        return true;
      } else {
        this.router.navigate(['']);
        this.flashMessage.show('Kindly Log-in first', {cssClass: 'alert-danger', timeout: 3000 });
        return false;
      }
  }
}
