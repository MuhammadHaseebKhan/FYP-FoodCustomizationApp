import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  isLoader = false;
  ordersArray: any;
  dummyOrdersArray;
  orderHit = 'order';
  orderStatus: any;
  Address: any;
  orderId;
  concatenatedUrl;
  // statusArray: any;
  constructor(
    private http: HttpServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoader = true;
    this.getOrder();
  }

  getOrder() {
    this.http.getOrderRequest(this.orderHit, 1)
    .subscribe(
      response => {
        this.isLoader = false;
        this.dummyOrdersArray = response;
        this.ordersArray = this.dummyOrdersArray;
      },
      error => {
        console.log(error);
      }
    );
  }
  deliverFood(order, i) {
    this.isLoader = true;
    this.orderId = order._id;
    console.log(this.orderId);
    this.concatenatedUrl = 'order/' + this.orderId;
    console.log(this.concatenatedUrl);
    const input = {
      'status': 0
      };
    this.http.put(this.concatenatedUrl, input)
    .subscribe(
      response => {
        this.isLoader = false;
        console.log(response);
        this.router.navigate(['admin-dashboard/ordersdelivered']);
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteFood(order, i) {
    this.isLoader = true;
    this.orderId = order._id;
    console.log(this.orderId);
    this.concatenatedUrl = 'https://foodistanweb.herokuapp.com/api/order/' + this.orderId;
    console.log(this.concatenatedUrl);
    window.alert('Are you sure?');
    this.http.delete(this.concatenatedUrl)
    .subscribe(
      response => {
        this.isLoader = false;
        const data = [...this.ordersArray];
        data.splice(i, 1);
        console.log(i);
        this.ordersArray = [...data];
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
