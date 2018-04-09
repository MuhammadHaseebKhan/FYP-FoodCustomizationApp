import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public departmentId;
  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.departmentId = id;
  }

}

