import { Component, OnInit } from '@angular/core';
import { TokenParams } from '../../classes/token-param';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  public myControl;

  tokenParams = TokenParams;
  mydata;

  input = {
    email: "",
    password: ""
  }

  constructor(private http: HttpServiceService, private router: Router) { }

  ngOnInit() {
  }

  getLogin() {
    console.log(this.input);
    this.http.login(this.input)
      .subscribe(
        data => {
          this.router.navigate(['/admin-dashboard']);
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
  }
}