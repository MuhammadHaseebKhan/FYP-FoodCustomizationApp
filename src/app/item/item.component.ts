import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  alertOk = false;
  alertCancel = false;
  FoodArray: any = [];
  dummyFoodArray: any = [];
  foodId;
  concatenatedUrl;
  categoriesArray: any = [];
  dummyCategoriesArray: any = [];
  categoryId;
  constructor(
    private http: HttpServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.foodId = params['cid'];
    });
    // this.getAllFood();
    this.getItemByFoodId();
    }

  getItemByFoodId() {
    const categoryWiseFoodUrl = 'item/list/' + this.foodId;
    console.log(categoryWiseFoodUrl);
    return this.http.getRequest(categoryWiseFoodUrl)
    .subscribe(
      response => {
        this.FoodArray = response;
        this.dummyFoodArray = this.FoodArray.data;
        // console.log(response);
        // console.log(this.categoriesArray.data);
        console.log(this.dummyFoodArray);
      },
      error => {
        console.log(error);
      }
    );
  }
  clickOnCategory(event, food, i) {
    // console.log(food);
    // const dummyIndex = i;
    // console.log(i);
    // this.foodId = food._id;
    // console.log(this.foodId);
    // this.concatenatedUrl = 'https://foodistanweb.herokuapp.com/api/category/' + this.foodId;
    // console.log(this.concatenatedUrl);
    // this.router.navigate(['admin-dashboard/items']);
  }
  deleteFood(food, i) {
    this.foodId = food._id;
    console.log(this.foodId);
    this.concatenatedUrl = 'https://foodistanweb.herokuapp.com/api/food/' + this.foodId;
    console.log(this.concatenatedUrl);
    window.alert('Are you sure?');
    this.http.delete(this.concatenatedUrl)
    .subscribe(
      response => {
        const data = [...this.dummyFoodArray];
        data.splice(i, 1);
        console.log(i);
        this.dummyFoodArray = [...data];
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  addCategory() {
    this.router.navigate(['admin-dashboard/additem']);
  }
}
