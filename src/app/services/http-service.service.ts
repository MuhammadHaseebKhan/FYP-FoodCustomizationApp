import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Headers, Http, HttpModule } from '@angular/http';


import { TokenParams } from '../../classes/token-param';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpServiceService {
  private orderReceived = [];
  private orderDelivered = [];
  private baseUrl: String = 'https://foodistanweb.herokuapp.com/api/';

  // AccessToken:string = '';
  private loginAPI = 'https://foodistanweb.herokuapp.com/api/auth/local';

  constructor(private http: HttpClient) { }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
  }


  login(data: Object) {
    console.log(data);
    return this.http.post(this.loginAPI, data)
      .map(res => res)
      .catch(err => Observable.throw(err));
  }


  signup(hit, data) {
    return this.http.post(`${this.baseUrl}${hit}`, data)
      .map(response => {
        console.log(response);
        return response;
      });
  }

  getRequest(hit) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') });
    // const headers = this.createAuthorizationHeader(new HttpHeaders());
    return this.http.get(`${this.baseUrl}${hit}`, { headers: headers })
      .map(response => {
        console.log(response);
        return response;
      });
  }

  postRequest(hit, data, token) {
    return this.http.post(`${this.baseUrl}${hit}`, data);
  }

  delete(url) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') });
    return this.http.delete(url, { headers: headers })
    .map(response => {
      console.log(response);
      return response;
    });
  }

  put(hit, data) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') });
    // const headers = this.createAuthorizationHeader(new HttpHeaders());
    return this.http.put(`${this.baseUrl}${hit}`, data, { headers: headers })
      .map(response => {
        console.log(response);
        return response;
      });
  }

  createRestaurant(hit, data) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') });
    return this.http.post(`${this.baseUrl}${hit}`, data, { headers: headers });
  }
  getRestuarant(hit) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') });
    return this.http.post(`${this.baseUrl}${hit}`, { headers: headers });
  }

  addNewCategory(hit, data) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') });
    return this.http.post(`${this.baseUrl}${hit}`, data, { headers: headers });
  }

  getAllCategories(hit) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') });
    return this.http.post(`${this.baseUrl}${hit}`, { headers: headers });
  }

  addNewFood(hit, data) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') });
    return this.http.post(`${this.baseUrl}${hit}`, data, { headers: headers });
  }

  uploadImage(hit, data) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') });
    return this.http.post(`${this.baseUrl}${hit}`, data, { headers: headers });
  }
  addNewItem(hit, data) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') });
    return this.http.post(`${this.baseUrl}${hit}`, data, { headers: headers });
  }

  getOrderRequest(hit , orderCheck) {
    this.orderDelivered = [];
    this.orderReceived = [];
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') });
    // const headers = this.createAuthorizationHeader(new HttpHeaders());
    return this.http.get(`${this.baseUrl}${hit}`, { headers: headers })
      .map(response => {
        console.log(response);
        response['data'].map(order => {
          if (order.status === 0) {
            this.orderDelivered.push(order);
          } else {
            this.orderReceived.push(order);
          }
        });
        if (orderCheck === 1) {
          return this.orderReceived;
        } else {
          return this.orderDelivered;
        }
      });
  }
}
