import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-orders-delivered',
  templateUrl: './orders-delivered.component.html',
  styleUrls: ['./orders-delivered.component.css']
})
export class OrdersDeliveredComponent implements OnInit {
  isLoader = false;
  ordersArray: any;
  dummyOrdersArray;
  orderHit = 'order';
  orderStatus: any;
  Address: any;
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
    this.http.getOrderRequest(this.orderHit, 0)
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
  deliverFood() {
     const input = {
      'status': 0
      };
    this.http.put(this.orderHit, input)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
