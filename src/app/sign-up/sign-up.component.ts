import { Component, OnInit } from '@angular/core';
import {HttpServiceService } from '../services/http-service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public input : any;
  constructor(private http : HttpServiceService ) {
    this.input = {
      email : "",
      password : ""
    };
   }
   url = "users";
   mydata;
   receivedData;
  postData(){
    this.http.signup(this.url,this.input).subscribe(data=>{
      this.mydata = data;
      console.log(this.mydata);
    },error=>{
      console.log(error,"ERROR!!")
    })
  }

  getData(){
    this.http.getRequest(this.url).subscribe(data =>{
      this.receivedData = data;
      console.log(this.receivedData);
    }, error=>{
      console.log(error,"data nhi arhaa");
    })
  }

  ngOnInit() {
  }

}
