import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  ordersArray;
  dummyOrdersArray;
  orderHit = 'order';
  constructor(
    private http: HttpServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    this.http.getRequest(this.orderHit)
    .subscribe(
      response => {
        this.dummyOrdersArray = response;
        this.ordersArray = this.dummyOrdersArray.data;
        console.log(this.ordersArray);
      },
      error => {
        console.log(error);
      }
    )
  }

}
