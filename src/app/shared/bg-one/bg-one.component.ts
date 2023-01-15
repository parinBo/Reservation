import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bg-one',
  templateUrl: './bg-one.component.html',
  styleUrls: ['./bg-one.component.scss']
})
export class BgOneComponent implements OnInit {
  width = 0;
  height =0;

  constructor() { }

  ngOnInit(): void {
    this.height = window.screen.height
    this.width = window.screen.width
  }

}
