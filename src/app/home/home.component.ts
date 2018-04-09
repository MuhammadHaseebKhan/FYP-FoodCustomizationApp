import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public departments = [
    { "id":1, "name":"Angular"},
    { "id":2, "name":"React"},
    { "id":3, "name":"Dot Net"},
    { "id":4, "name":"Java"},
    { "id":5, "name":"Mongo DB"},
    { "id":6, "name":"Mongo DB"},
  ]
  constructor( private router: Router) { }

  ngOnInit() {
  }
  
  onSelect(department){
    this.router.navigate(['/home',department.id]);
  }

}
