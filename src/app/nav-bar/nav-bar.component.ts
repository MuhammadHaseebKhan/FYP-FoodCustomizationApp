import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpServiceService } from '../services/http-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { timeout } from 'q';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userData;
  parseUserData;
  userRole;
  userToken;
  isUserRoleAdmin = false;
  getUsersHit = 'users';

  @Input('sidenav') sidenav: any;
  constructor(
      private auth: AuthService,
      private router: Router,
      private flashMessage: FlashMessagesService,
      private httpService: HttpServiceService,
  ) {}

  ngOnInit() {
    // setTimeout(() => {
    // console.log(this.sidenav)
    // this.sidenav.open()
    // },10000)
    this.getUserData();
  }

  onLogOut() {
    this.auth.logOut();
    this.flashMessage.show('You are logged out', {cssClass: 'alert-success', timeout: 5000});
    this.router.navigate(['/login']);
    return false;
  }

  getUserData() {
    this.userData = this.auth.getUserDataFromLocalStorage();
    this.parseUserData = JSON.parse(this.userData);
    this.userRole = this.parseUserData.role;
    console.log('******');
    console.log(this.parseUserData);
    console.log(this.userRole);
    console.log('******');
    if (this.userRole === 'superadmin') {
      this.isUserRoleAdmin = true;
    } else {
      this.isUserRoleAdmin = false;
    }
  }

  getAllUsers() {
    return this.httpService.getRequest(this.getUsersHit, this.userToken)
    .subscribe( data => {
      console.log(data);
    },
    error => {
      console.log(error);
    }
  );
    }
  }
