import { Component, OnInit } from '@angular/core';
import { TokenParams } from '../../classes/token-param';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoader = false;
  hide = true;
  public myControl;

  tokenParams = TokenParams;
  mydata;

  input = {
    email: '',
    password: ''
  };

  constructor(
      private auth: AuthService,
      private flashMessage: FlashMessagesService,
      private httpService: HttpServiceService,
      private router: Router) { }

  ngOnInit() {

  }

  getLogin() {
    console.log('hello world');
    this.isLoader = true;
    console.log(this.input);
    this.httpService.login(this.input)
      .subscribe(
        data => {
          this.isLoader = false;
          if (data.data.role === 'admin' || data.data.role === 'superadmin') {
            console.log(data);
            console.log(data.data.role);
            // this.auth.storeUserData(data.token, data.data);
            this.auth.storeUserData(data.token, data.data);
            this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000 });
            this.router.navigate(['/admin-dashboard/dashboardcontent']);
          } else {
            this.flashMessage.show('You are not registered as admin', {cssClass: 'alert-danger', timeout: 5000 });
          }
        },
        error => {
          this.isLoader = false;
          this.flashMessage.show('Unauthorized!',  {cssClass: 'alert-danger', timeout: 5000 });
          console.log(error);
        }
      );
  }
}
