import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent implements OnInit {

  userData;
  parseUserData;
  userRole;
  isUserRoleAdmin = false;

  constructor(
    private auth: AuthService,
  ) {

   }

  ngOnInit() {
    this.getUserData();
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

}
