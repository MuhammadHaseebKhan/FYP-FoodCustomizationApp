import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  public input: any;

  userToken;
  getRestaurantsHit = 'restaurant';
  registerFoodHit = 'food';
  hide = true;
  catId: '';
  isFormValid = false;
  selected2;
  myControl: FormControl = new FormControl();

  options: any = [

  ];
  dummyOptions;
  createFoodForm: FormGroup;
  filteredOptions: Observable<any[]>;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private http: HttpServiceService,
    private validateService: ValidateService,
    public fb: FormBuilder,
  ) {

    this.createForm();
    //
    // this.input = {
    //   email: '',
    //   password: ''
    // };
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
    this.getAllCategories();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  getAllCategories() {
    return this.http.getRequest('category')
      .subscribe(
        response => {
          this.dummyOptions = response;
          this.options = this.dummyOptions.data;
          // console.log(response);
          // console.log(this.categoriesArray.data);
          console.log(this.dummyOptions);
        },
        error => {
          console.log(error);
        }
      );
  }



  filter(val: any): any[] {
    console.log(val);
    if (typeof val === 'string') {
      console.log(this.options);
      // this.dummyOptions = this.options.data;
      return this.options.filter(option =>
        option.name.toLowerCase().includes(val.toLowerCase()));
    }
  }

  submitUserDetails() {
    this.createFoodForm.value.catId = this.myControl.value._id;
    console.log(this.createFoodForm.value);
    this.http.addNewFood(this.registerFoodHit, this.createFoodForm.value)
      .subscribe(data => {
        console.log(data);
      },
        error => {
          console.log(error);
        }
      );
  }
  displayFn(data) {
    console.log(data);
    // this.input.uId = data._id;
    return data ? data.name : data;
  }

}


  // addFood() {
  //   console.log(this.input);
  //   this.http.addNewFood('food', this.input)
  //   .subscribe(response => {
  //     console.log(response);
  //   },
  //   error => {
  //     console.log(error);
  // });
  // }

