import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input('sidenav') sidenav: any
  constructor() {}

  ngOnInit() {
    // setTimeout(() => {
    console.log(this.sidenav)
    // this.sidenav.open()
    // },10000)
  }

}
