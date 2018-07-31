import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-all-categories-only',
  templateUrl: './all-categories-only.component.html',
  styleUrls: ['./all-categories-only.component.css']
})
export class AllCategoriesOnlyComponent implements OnInit {
  alertOk = false;
  alertCancel = false;
  categoriesArray: any = [];
  dummyCategoriesArray: any = [];
  categoryId;
  concatenatedUrl;
  isLoader = false;

  constructor(
    private http: HttpServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.callAgain();
    this.isLoader = true;
    this.getAllCategories();
  }

  getAllCategories() {
    return this.http.getRequest('category')
    .subscribe(
      response => {
        this.isLoader = false;
        this.categoriesArray = response;
        this.dummyCategoriesArray = this.categoriesArray.data;
        // console.log(response);
        // console.log(this.categoriesArray.data);
        console.log(this.dummyCategoriesArray);
      },
      error => {
        this.isLoader = false;
        console.log(error);
      }
    );
  }
  clickOnCategory(event, category, i) {
    // console.log(category);
    // const dummyIndex = i;
    // console.log(i);
    event.preventDefault();
    event.stopPropagation();
    this.categoryId = category._id;
    console.log(this.categoryId);
    // this.concatenatedUrl = 'https://foodistanweb.herokuapp.com/api/category/' + this.categoryId;
    // console.log(this.concatenatedUrl);
    this.router.navigate(['admin-dashboard/categorywisefood', this.categoryId]);
  }
  deleteCategory(category, i) {
    this.categoryId = category._id;
    console.log(this.categoryId);
    this.concatenatedUrl = 'https://foodistanweb.herokuapp.com/api/category/' + this.categoryId;
    console.log(this.concatenatedUrl);
    window.alert('Are you sure?');
    this.http.delete(this.concatenatedUrl)
    .subscribe(
      response => {
        const data = [...this.dummyCategoriesArray];
        data.splice(i, 1);
        console.log(i);
        this.dummyCategoriesArray = [...data];
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  editCategory(category, i) {
    console.log(category._id);
    console.log(category.name);
    this.categoryId = category._id;
    // console.log(this.categoryId);
    this.router.navigate(['admin-dashboard/editcategory', this.categoryId]);
  }

  addCategory() {
    this.router.navigate(['admin-dashboard/addcategory']);
  }

  callAgain() {
    setInterval(function() {
      console.log('Hello babe!');
    }, 1000);
  }
}