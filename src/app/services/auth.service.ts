import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
// import { tokenNotExpired } from 'angular2-jwt';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;


  constructor(
    // public jwtHelper: JwtHelperService,
    private http: HttpServiceService
  ) { }
  storeUserData(token, userData) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    this.authToken = token;
    this.user = userData;
  }

  // Get user data from local storage

  getUserDataFromLocalStorage() {
    return localStorage.getItem('user');
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // isLoggedIn() {
  //   return tokenNotExpired('id_token');
  // }

  // isLoggedIn() {
  //   return this.jwtHelper.isTokenExpired('id_token');
  // }

}
