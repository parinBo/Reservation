import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'backend/src/models/userModel';
import { ReservationService } from 'src/app/services/reservation.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit, AfterViewInit {
  form:FormGroup = this.fb.group({});
  get firstName() {return this.form.get('firstName')}
  get lastName() {return this.form.get('lastName')}
  get userName() {return this.form.get('userName')}
  get password() {return this.form.get('password')}
  get confirmPassword() {return this.form.get('confirmPassword')}

  formSubmitted = false;

  constructor(private fb: FormBuilder,
    private modalService: ModalService,
    private api: ReservationService,
    private toastService:ToastService,
    private route: Router) {
    this.createForm();
   }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.firstName?.setValidators([Validators.required,Validators.pattern(`[^0-9:;"'_,.?()\/{}*&^%$#@!]+`)])
    this.lastName?.setValidators([Validators.required,Validators.pattern(`[^0-9:;"'_,.?()\/{}*&^%$#@!]+`)])
}

  createForm(){
    this.form = this.fb.group({
      firstName: [''],
      lastName: ['',],
      userName: [''],
      password: [''],
      confirmPassword: ['']
    })
  }

  backToLogin(){
    this.route.navigateByUrl('/login');
  }

  validate(){
    let check = true;
    if(this.password?.value !== this.confirmPassword?.value){
      this.password?.setErrors({notSame:true})
      this.confirmPassword?.setErrors({notSame:true})
      check = false;
    }
    return check && this.form.valid
  }

  signup(){
    this.formSubmitted = true
    if(this.validate()){
      const user:User={
        role_id: 0,
        username: this.userName?.value,
        password: this.password?.value,
        fname: this.firstName?.value,
        lname: this.lastName?.value
      }
      UIService.setLoading(true);
      this.api.createUser(user).subscribe((result) => {
        UIService.setLoading(false);
        let msg = ''
        if(result.status[0] === 's'){
          this.toastService.showToast('Success','s')
            msg = 'สมัครสำเร็จ กำลังกลับสู่หน้าลงชื่อเข้าใช้งาน';
            UIService.setLoading(true);
            setTimeout(()=>{
              this.route.navigateByUrl('/login');
              this.modalService.close('mainModal');
              UIService.setLoading(false);
            },1000)
        }else{
          this.toastService.showToast('Error',result.status)
          msg = result.msg;
        }
        this.modalService.open('mainModal',msg,false)
      },(err)=>{
        UIService.setLoading(false);
      })
    }

  }

}
