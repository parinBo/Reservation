import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  form:FormGroup = this.fb.group({})
  get username() {return this.form.get('username');}
  get password() {return this.form.get('password');}

  constructor(
    private fb: FormBuilder, private route: Router,
    private modal:ModalService,private api:ReservationService) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
      this.username?.setValidators(Validators.required);
      this.password?.setValidators(Validators.required);
  }

  createForm(){
    this.form = this.fb.group({
      username: ['',],
      password: ['',]
    })
  }

  validte(){
    return this.form.valid
  }

  signin(){
    if(this.validte()){
      UIService.setLoading(true);
      const user={
        username: this.username?.value,
        password: this.password?.value,
      }
      this.api.signin(user).subscribe(res=>{
        if((res as any).status === 's'){
          UIService.setLoading(true);
          localStorage.setItem('token',res.data)
          setTimeout(() => {
            UIService.setLoading(false);
            this.route.navigate(['/'])
          }, 1000);

        }else{
          this.modal.open('mainModal',res.msg,false)
        }
      },err =>{
        UIService.setLoading(false);
      })
      UIService.setLoading(false);
    }
    }
}
