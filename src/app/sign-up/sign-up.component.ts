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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public input: any;

  userToken;
  getRestaurantsHit = 'restaurant';
  registerUserHit = 'users';
  hide = true;
  resId: '';
  isFormValid = false;
  selected2;
  myControl: FormControl = new FormControl();

  options: any = [

  ];
  dummyOptions;
  createRestaurantForm: FormGroup;
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
    this.createRestaurantForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      resId: ['', Validators.required]
      // countryId: ['', Validators.required],
      // uId: ['', Validators.required],
    });
  }

  // url = 'users';
  // mydata;
  // receivedData;
  // postData() {
  //   this.http.signup(this.url, this.input).subscribe(data => {
  //     if (data) {
  //       this.flashMessage.show('You are now registered! and can login', { cssClass: 'alert-success', timeout: 3000 });
  //       this.router.navigate(['/login']);
  //     }
      //  else {
      //   this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 2000});
      //   this.router.navigate(['/signup']);
      //  }
  //   }, error => {
  //     this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 2000 });
  //     this.router.navigate(['/signup']);
  //   });
  // }

  // getData() {
  //   this.http.getRequest(this.url, '').subscribe(data => {
  //     this.receivedData = data;
  //     console.log(this.receivedData);
  //   }, error => {
  //     console.log(error, 'data nhi arhaa');
  //   });
  // }

  // validateSignUp() {
  //   console.log(this.input);
  //   if (!this.validateService.validateFormFields(this.input)) {
  //     this.flashMessage.show('please fill all fields', { cssClass: 'alert-danger', timeout: 2000 });
  //     return false;
  //   }
  //   if (!this.validateService.validateEmail(this.input.email)) {
  //     this.flashMessage.show('Enter valid email', { cssClass: 'alert-danger', timeout: 2000 });
  //     return false;
  //   }
  //   this.postData();
  // }

  ngOnInit() {
    this.getAllRestaurants();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  getAllRestaurants() {
    return this.http.getRequest(this.getRestaurantsHit, this.userToken)
      .subscribe(response => {
        this.options = response.data;
        // console.log(data);
        console.log(this.options);
        // console.log(this.options.data);
      },
        error => {
          console.log(error);
        }
      );
  }


  filter(val: any): any[] {
    console.log(val);
    if (typeof val !== 'string') {
      this.resId = val['_id'];
    } else {
      console.log(this.options);
      // this.dummyOptions = this.options.data;
      return this.options.filter(option =>
        option.name.toLowerCase().includes(val.toLowerCase()));
    }
  }

  submitUserDetails() {
    // this.createRestaurantForm.value.uId = this.myControl.value._id;
    console.log(this.createRestaurantForm.value);
    this.http.createRestaurant(this.registerUserHit, this.createRestaurantForm.value)
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
