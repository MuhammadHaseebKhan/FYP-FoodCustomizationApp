import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {

  getRestaurantsHit = 'restaurant';
  restaurantsArray: any = [

  ];
  dummyrestaurantsArray;
  concatenatedUrl;
  restId;
  dummyRestaurantsArray;
  isLoader = false;
  isDeleteLoader = false;
  isArrayEmpty = false;
  restaurantId;

  constructor(
    private http: HttpServiceService,
    private router: Router,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.isLoader = true;
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    return this.http.getRequest(this.getRestaurantsHit)
      .subscribe(response => {
        this.dummyrestaurantsArray = response;
        this.restaurantsArray = this.dummyrestaurantsArray.data;
        this.isLoader = false;
        if (this.restaurantsArray.length === 0 || this.restaurantsArray.length === undefined) {
          this.isArrayEmpty = true;
        }
        // console.log(data);
        console.log(this.restaurantsArray);
        // console.log(this.options.data);
      },
        error => {
          console.log(error);
        }
      );
  }
  clickOnRestaurant(event, restaurant, i) {
    console.log(restaurant);
    const dummyIndex = i;
    console.log(i);
    this.restId = restaurant._id;
    console.log(this.restId);
    this.concatenatedUrl = 'https://foodistanweb.herokuapp.com/api/category/' + this.restId;
    console.log(this.concatenatedUrl);
  }

  deleteRestaurant(restaurant, i) {
    this.isDeleteLoader = true;
    this.restId = restaurant._id;
    console.log(this.restId);
    this.concatenatedUrl = 'https://foodistanweb.herokuapp.com/api/restaurant/' + this.restId;
    console.log(this.concatenatedUrl);
    window.alert('Are you sure?');
    this.http.delete(this.concatenatedUrl)
    .subscribe(
      response => {
        this.isDeleteLoader = false;
        const data = [...this.restaurantsArray];
        data.splice(i, 1);
        console.log(i);
        this.restaurantsArray = [...data];
        this.flashMessage.show('Restaurant has been deleted', {cssClass: 'alert-success', timeout: 3000 });
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
  eidtRestaurant(restaurant, i) {
    this.restaurantId = restaurant._id;
    this.router.navigate(['admin-dashboard/editrestaurant', this.restaurantId]);
  }

  addRestaurant() {
    this.router.navigate(['admin-dashboard/newrestaurant']);
  }

}
