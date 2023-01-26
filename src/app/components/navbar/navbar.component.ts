import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  date : Date = new Date();
  @ViewChild('area')area!:ElementRef
  @ViewChild('sideNav')sideNav!:ElementRef

  get role(): number {return parseInt(this.auth.user()?.['role']) || 0;}

  constructor(private auth:AuthService) {
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

  adminExpand(){
    const ele = this.sideNav.nativeElement as HTMLElement;
    console.log(ele)
    ele.style.width = '350px';
  }

  adminClose(){
    const ele = this.sideNav.nativeElement as HTMLElement;
    ele.style.width = '0px';
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
