import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form:FormGroup = this.fb.group({})
  get username() {return this.form.get('username');}
  get password() {return this.form.get('password');}

  constructor(
    private fb: FormBuilder,
    private modal:ModalService,private api:ReservationService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  signin(){
    UIService.setLoading(true);
    const user={
      username: this.username?.value,
      password: this.password?.value,
    }
    this.api.signin(user).subscribe(res=>{
      console.log(res)
      if((res as any).status === 's'){
      }else{
        this.modal.open('modal',(res as any).msg,false)
      }
    },err =>{
      UIService.setLoading(false);
    })
    UIService.setLoading(false);
  }

}
