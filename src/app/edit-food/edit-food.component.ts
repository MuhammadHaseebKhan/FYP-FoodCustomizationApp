import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent implements OnInit {

  imgId;
  dummyImgId;
  isLoader = false;
  selectedFile: File = null;
  foodId;
  concatenatedUrl;
  dummyResponseArray;
  responseArray;
  myControl: FormControl = new FormControl();
  createFoodForm: FormGroup;
  isFormValid = false;
  foodName;
  foodPrice;
  foodImage;
  foodCategory;
  constructor(
    private http: HttpServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
  ) {
    this.createForm();
  }
  createForm() {
    this.createFoodForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', Validators.required],
      upImgId: ['', Validators.required],
      // password: ['', Validators.required],
      // resId: ['', Validators.required]
      // countryId: ['', Validators.required],
      // uId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.foodId = params['cid'];
      console.log(this.foodId);
      this.concatenatedUrl = 'food/' + this.foodId;
      console.log(this.concatenatedUrl);
    });
    this.getFoodById();
  }
  getFoodById() {
    this.http.getRequest(this.concatenatedUrl)
    .subscribe(
      response => {
        // console.log(response);
        this.dummyResponseArray = response;
        this.responseArray = this.dummyResponseArray.data;
        console.log(this.responseArray);
        this.foodName = this.responseArray.name;
        this.foodPrice = this.responseArray.price;
        this.foodCategory = this.responseArray.catId;
        // this.foodImage = this.responseArray.upImgId;
        this.createFoodForm.value.name = this.foodName;
        this.createFoodForm.value.price = this.foodPrice;
        this.createFoodForm.value.catId = this.foodCategory;

        // this.createFoodForm.value.upImgId = this.foodImage;
        // this.input.name = this.foodName;
      },
      error => {
        console.log(error);
      }
    );
  }
  editFood() {
    this.isLoader = true;
    this.http.put(this.concatenatedUrl, this.createFoodForm.value)
    .subscribe(
      response => {
        this.isLoader = false;
        console.log(response);
        this.router.navigate(['admin-dashboard/food']);
      },
      error => {
        console.log(error);
      }
    );
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.isLoader = true;
    const fd = new FormData();
    fd.append('food_img_1', this.selectedFile, this.selectedFile.name);
    console.log(this.selectedFile.name);
    this.http.uploadImage('upload', fd)
    .subscribe(
      response => {
        console.log(response);
        this.dummyImgId = response;
        this.imgId = this.dummyImgId.data._id;
        console.log(this.imgId);
        this.createFoodForm.value.upImgId = this.imgId;
        this.editFood();
        console.log(this.createFoodForm.value.upImgId);
      },
      error => {
        console.log(error);
      }
    );
  }

}
