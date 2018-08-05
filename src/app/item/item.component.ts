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
  itemArray: any = [];
  dummyItemArray: any = [];
  foodId;
  itemId;
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
      this.foodId = params['cid'];
    });
    // this.getAllFood();
    this.getItemByFoodId();
    }

  getItemByFoodId() {
    const foodWiseItemsUrl = 'item/list/' + this.foodId;
    console.log(foodWiseItemsUrl);
    return this.http.getRequest(foodWiseItemsUrl)
    .subscribe(
      response => {
        this.itemArray = response;
        this.dummyItemArray = this.itemArray.data;
        this.isLoader = false;
        // console.log(response);
        // console.log(this.categoriesArray.data);
        console.log(this.dummyItemArray);
      },
      error => {
        console.log(error);
      }
    );
  }
  clickOnItem(event, item, i) {
   console.log(item.name);
   console.log(item._id);
  }
  deleteItem(item, i) {
    this.itemId = item._id;
    console.log(this.itemId);
    this.concatenatedUrl = 'https://foodistanweb.herokuapp.com/api/item/' + this.itemId;
    console.log(this.concatenatedUrl);
    window.alert('Are you sure?');
    this.http.delete(this.concatenatedUrl)
    .subscribe(
      response => {
        const data = [...this.dummyItemArray];
        data.splice(i, 1);
        console.log(i);
        this.dummyItemArray = [...data];
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
