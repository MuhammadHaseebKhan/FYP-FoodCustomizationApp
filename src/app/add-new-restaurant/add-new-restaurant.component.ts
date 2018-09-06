import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-new-restaurant',
  templateUrl: './add-new-restaurant.component.html',
  styleUrls: ['./add-new-restaurant.component.css']
})
export class AddNewRestaurantComponent implements OnInit {

  isLoader = false;
  userToken;
  getUsersHit = 'users';
  hide = true;
  uId: '';
  isFormValid = false;
  selected2;
  myControl: FormControl = new FormControl();

  options: any = [

  ];
  createRestaurantForm: FormGroup;
  filteredOptions: Observable<any[]>;


  constructor(
    private flashMessage: FlashMessagesService,
    private httpService: HttpServiceService,
    public fb: FormBuilder,
    private router: Router,
  ) {
    this.createForm();
  }
  createForm() {
    this.createRestaurantForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      branch: ['', Validators.required],
      code: ['', Validators.required],
      // upImgId: ['', Validators.required]
      // countryId: ['', Validators.required],
      // uId: ['', Validators.required],
    });
  }
  ngOnInit() {
    // this.isLoader = true;
    // this.getAllUsers();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }
  filter(val: string): string[] {
    console.log(val);
    if (typeof val !== 'string') {
      this.uId = val['_id'];
    } else {
      return this.options.filter(option =>
        option.email.toLowerCase().includes(val.toLowerCase()));
    }
  }
  getAllUsers() {
    return this.httpService.getRequest(this.getUsersHit)
      .subscribe(data => {
        // this.isLoader = false;
        this.options = data;
        // console.log(data);
        console.log(this.options);
      },
        error => {
          console.log(error);
        }
      );
  }

  submitRestaurantDetails() {
    this.isLoader = true;
    console.log(this.createRestaurantForm.value);
    // this.createRestaurantForm.value.uId = this.myControl.value._id;
    this.httpService.createRestaurant('restaurant', this.createRestaurantForm.value)
      .subscribe(data => {
        this.isLoader = false;
        console.log(data);
        this.flashMessage.show('Restaurant created successfully!', {cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['admin-dashboard/restaurantslist']);
      },
        error => {
          console.log(error);
        }
      );
  }
  displayFn(data) {
    console.log(data);
    // this.input.uId = data._id;
    return data ? data.email : data;
  }

}
