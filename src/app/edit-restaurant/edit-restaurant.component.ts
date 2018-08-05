import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {

  isLoader = false;
  restaurantId;
  concatenatedUrl;
  dummyResponseArray;
  responseArray;
  restaurantName;
  restaurantemail;
  restaurantBranch;
  restaurantCode;
  myControl: FormControl = new FormControl();
  createRestaurantForm: FormGroup;


  constructor(
    private http: HttpServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
  ) {
    this.createForm();
   }
  createForm() {
    this.createRestaurantForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      branch: ['', Validators.required],
      code: ['', Validators.required],
      // upImgId: ['', Validators.required]
      // countryId: ['', Validators.required],
      // uId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.isLoader = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.restaurantId = params['cid'];
      console.log(this.restaurantId);
      this.concatenatedUrl = 'restaurant/' + this.restaurantId;
      console.log(this.concatenatedUrl);
    });
    this.getRestaurantById();
  }
  getRestaurantById() {
    this.http.getRequest(this.concatenatedUrl)
    .subscribe(
      response => {
        this.isLoader = false;
        // console.log(response);
        this.dummyResponseArray = response;
        this.responseArray = this.dummyResponseArray.data;
        console.log(this.responseArray);
        this.restaurantName = this.responseArray.name;
        console.log(this.restaurantName);
        this.restaurantemail = this.responseArray.email;
        console.log(this.restaurantemail);
        this.restaurantBranch = this.responseArray.branch;
        this.restaurantCode = this.responseArray.code;
        this.createRestaurantForm.value.name = this.restaurantName;
        console.log(this.createRestaurantForm.value.name);
        this.createRestaurantForm.value.email = this.restaurantemail;
        console.log(this.createRestaurantForm.value.email);
        this.createRestaurantForm.value.branch = this.restaurantBranch;
        this.createRestaurantForm.value.code = this.restaurantCode;

        // this.input.name = this.restaurantName;
      },
      error => {
        console.log(error);
      }
    );
  }
  editRestaurant() {
    this.isLoader = true;
    this.http.put(this.concatenatedUrl, this.createRestaurantForm.value)
    .subscribe(
      response => {
        this.isLoader = false;
        console.log(response);
        this.router.navigate(['admin-dashboard/restaurantslist']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
