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

}
