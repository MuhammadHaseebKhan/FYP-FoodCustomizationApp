import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {

  getProfileHit = 'users/me';
  dummyUserProfileData;
  userProfileData: any = {};
  selectedFile: File = null;
  imgInput = {
    food_img_1 : ''
  };
  imgId;
  dummyImgId;

  constructor(
    private http: HttpServiceService,
  ) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this.http.getRequest(this.getProfileHit)
    .subscribe(
      response => {
        this.dummyUserProfileData = response;
        this.userProfileData = this.dummyUserProfileData.data;
      console.log(this.userProfileData);
    },
      error => {
        console.log(error);
    }
    );
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
