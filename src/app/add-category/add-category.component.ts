import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  input = {
    name: '',
    level: 1,
    isLeaf: 1
  };

  constructor(
    private httpService: HttpServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  addCategory() {
    console.log(this.input);
    this.httpService.addNewCategory('category', this.input)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['admin-dashboard/allcategories']);
    },
    error => {
      console.log(error);
  });
  }
}
