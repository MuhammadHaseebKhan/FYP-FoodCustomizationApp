import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-category-wise-food',
  templateUrl: './category-wise-food.component.html',
  styleUrls: ['./category-wise-food.component.css']
})
export class CategoryWiseFoodComponent implements OnInit {
  alertOk = false;
  alertCancel = false;
  FoodArray: any = [];
  dummyFoodArray: any = [];
  foodId;
  concatenatedUrl;
  categoriesArray: any = [];
  dummyCategoriesArray: any = [];
  categoryId;
  isLoader = false;
  constructor(
    private http: HttpServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoader = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.categoryId = params['cid'];
    });
    // this.getAllFood();
    this.getCategoryWiseFood();
    }

  getCategoryWiseFood() {
    const categoryWiseFoodUrl = 'category/all/cat/' + this.categoryId;
    console.log(categoryWiseFoodUrl);
    return this.http.getRequest(categoryWiseFoodUrl)
    .subscribe(
      response => {
        this.FoodArray = response;
        this.dummyFoodArray = this.FoodArray.data;
        this.isLoader = false;
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
    event.preventDefault();
    event.stopPropagation();
    this.foodId = food._id;
    console.log(this.foodId);
    // this.concatenatedUrl = 'https://foodistanweb.herokuapp.com/api/category/' + this.foodId;
    // console.log(this.concatenatedUrl);
    this.router.navigate(['admin-dashboard/items', this.foodId]);
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
    this.router.navigate(['admin-dashboard/addfood']);
  }
}
