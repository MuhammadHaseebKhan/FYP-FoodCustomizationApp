import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import {Headers, Http, HttpModule} from '@angular/http';


import {TokenParams} from '../../classes/token-param';

@Injectable()
export class HttpServiceService {
  private baseUrl:string = 'https://foodistanweb.herokuapp.com/api/';

  AccessToken:string = "";
  private loginAPI = "https://foodistanweb.herokuapp.com/api/auth/local";

  constructor(private http : HttpClient) { }


  login(data: Object):Observable<TokenParams>{
    console.log(data);
    return this.http.post(this.loginAPI, data)
    .map(res => res)
    .catch(err => Observable.throw(err));
  }


  signup(hit,data){
    return this.http.post(`${this.baseUrl}${hit}`,data)
    .map(data=>{
      console.log(data);
     return data; 
    })                           
  }

  
  getRequest(hit){
    return this.http.get(`${this.baseUrl}${hit}`)
  }

}
