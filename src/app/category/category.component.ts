import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  // Ant design Modal

  // isVisible = false;
  // isOkLoading = false;

  // showModal(): void {
  //   this.isVisible = true;
  // }

  // handleOk(): void {
  //   this.isOkLoading = true;
  //   window.setTimeout(() => {
  //     this.isVisible = false;
  //     this.isOkLoading = false;
  //   }, 3000);
  // }

  // handleCancel(): void {
  //   this.isVisible = false;
  // }

  alertOk = false;
  alertCancel = false;
  categoriesArray: any = [];
  dummyCategoriesArray: any = [];
  categoryId;
  concatenatedUrl;
  constructor(
    private http: HttpServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    return this.http.getRequest('category')
    .subscribe(
      response => {
        this.categoriesArray = response;
        this.dummyCategoriesArray = this.categoriesArray.data;
        // console.log(response);
        // console.log(this.categoriesArray.data);
        console.log(this.dummyCategoriesArray);
      },
      error => {
        console.log(error);
      }
    );
  }
  clickOnCategory(event, category, i) {
    console.log(category);
    const dummyIndex = i;
    console.log(i);
    this.categoryId = category._id;
    console.log(this.categoryId);
    this.concatenatedUrl = 'https://foodistanweb.herokuapp.com/api/category/' + this.categoryId;
    console.log(this.concatenatedUrl);
    this.router.navigate(['admin-dashboard/food']);
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

  addCategory() {
    this.router.navigate(['admin-dashboard/addcategory']);
  }
}
