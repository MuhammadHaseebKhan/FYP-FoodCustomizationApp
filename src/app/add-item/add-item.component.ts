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
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  public input: any;

  isLoader = false;
  userToken;
  getRestaurantsHit = 'restaurant';
  addItemHit = 'item';
  hide = true;
  catId: '';
  isFormValid = false;
  selected2;
  myControl: FormControl = new FormControl();

  options: any = [

  ];
  dummyOptions;
  createItemForm: FormGroup;
  filteredOptions: Observable<any[]>;
  selectedFile: File = null;

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
    this.createItemForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', Validators.required],
      foodId: ['', Validators.required],
      // password: ['', Validators.required],
      // resId: ['', Validators.required]
      // countryId: ['', Validators.required],
      // uId: ['', Validators.required],
    });
  }


  ngOnInit() {
    this.isLoader = true;
    this.getAllFood();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  getAllFood() {
    return this.http.getRequest('food')
    .subscribe(
      response => {
        this.isLoader = false;
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
    this.isLoader = true;
    this.createItemForm.value.foodId = this.myControl.value._id;
    console.log(this.createItemForm.value);
    this.http.addNewItem(this.addItemHit, this.createItemForm.value)
      .subscribe(data => {
        this.isLoader = false;
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

  // onFileSelected(event) {
  //   console.log(event);
  //   this.selectedFile = event.target.files[0];
  // }

  // onUpload() {
  //   const fd = new FormData();
  //   fd.append('food_img_1', this.selectedFile, this.selectedFile.name);
  //   console.log(this.selectedFile.name);
  //   this.http.uploadImage('upload', fd)
  //   .subscribe(
  //     response => {
  //       console.log(response);
  //       this.dummyImgId = response;
  //       this.imgId = this.dummyImgId.data._id;
  //       console.log(this.imgId);
  //       this.createFoodForm.value.upImgId = this.imgId;
  //       this.submitUserDetails();
  //       console.log(this.createFoodForm.value.upImgId);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
}
