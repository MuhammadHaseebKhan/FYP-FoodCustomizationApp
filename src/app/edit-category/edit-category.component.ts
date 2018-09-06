import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  dummyResponseArray;
  responseArray;
  concatenatedUrl;
  categoryId;
  categoryName;
  input = {
    name: '',
    level: 1,
    isLeaf: 1
  };
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
      console.log(this.categoryId);
      this.concatenatedUrl = 'category/' + this.categoryId;
      console.log(this.concatenatedUrl);
    });

    this.getCategoryById();
  }
  getCategoryById() {
    this.http.getRequest(this.concatenatedUrl)
    .subscribe(
      response => {
        this.isLoader = false;
        // console.log(response);
        this.dummyResponseArray = response;
        this.responseArray = this.dummyResponseArray.data;
        console.log(this.responseArray);
        this.categoryName = this.responseArray.name;
        this.input.name = this.categoryName;
      },
      error => {
        console.log(error);
      }
    );
  }
  editCategory() {
    this.http.put(this.concatenatedUrl, this.input)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['admin-dashboard/allcategories']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
