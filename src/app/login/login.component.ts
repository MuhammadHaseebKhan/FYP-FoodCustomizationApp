import { Component, OnInit } from '@angular/core';
import { TokenParams } from '../../classes/token-param';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  createRestaurantForm: FormGroup;

  // input = {
  //   email: '',
  //   password: ''
  // };

  constructor(
      private auth: AuthService,
      private flashMessage: FlashMessagesService,
      private httpService: HttpServiceService,
      private router: Router,
      public fb: FormBuilder,
    ) {
      this.createForm();
     }
     createForm() {
      this.createRestaurantForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        // code: ['', Validators.required],
        // upImgId: ['', Validators.required]
        // countryId: ['', Validators.required],
        // uId: ['', Validators.required],
      });
    }

  ngOnInit() {

  }

  getLogin() {
    console.log('hello world');
    this.isLoader = true;
    console.log(this.createRestaurantForm.value);
    this.httpService.login(this.createRestaurantForm.value)
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
          this.flashMessage.show('Invalid username or password!',  {cssClass: 'alert-danger', timeout: 5000 });
          console.log(error);
        }
      );
  }
}
