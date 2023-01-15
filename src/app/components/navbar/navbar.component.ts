import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  date : Date = new Date();
  @ViewChild('area')area!:ElementRef
  constructor() {
    setInterval(() => {
      this.date = new Date();
    }, 1);
   }

  ngOnInit(): void {
  }

  onLogout(){
    localStorage.removeItem('token');
    window.location.reload();
  }

  expand(){
    const ele = this.area.nativeElement as HTMLElement
    if(ele.classList.contains('show')){
      ele.classList.remove('show')
    }else{
      ele.classList.add('show')
    }

  }

}
