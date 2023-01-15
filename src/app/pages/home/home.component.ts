import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { dataControl } from 'src/app/models/data';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name = '';
  formGroup: FormGroup = this.createFormGroup();
  listBuildings:any[] = []
  listTimes:any[] = [
    {id:1,time:'08.00-09.00'},
    {id:2,time:'09.00-10.00'},
    {id:3,time:'10.00-11.00'},
    {id:4,time:'11.00-12.00'},
    {id:5,time:'12.00-13.00'},
    {id:6,time:'13.00-14.00'},
    {id:7,time:'14.00-15.00'},
    {id:8,time:'15.00-16.00'},
    {id:9,time:'16.00-17.00'},
    {id:10,time:'17.00-18.00'},
  ]
  get nameId() {return this.formGroup.controls['nameId'];}
  get timeId() {return this.formGroup.controls['timeId'];}
  get date() {return this.formGroup.controls['date'];}


  constructor(private auth:AuthService,
    private route:Router,
    private api: ReservationService,
    private fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.name = (await this.auth.user() as any)?.username || '';
    this.api.listBuilding().subscribe(res=>{
      this.listBuildings = res.data;
      dataControl.listBuilding = this.listBuildings;
    })
  }

  createFormGroup(){
    return this.fb.group({
      nameId: [''],
      date: [''],
      timeId: [0]
    })
  }

  onClickOrder(){
    this.route.navigate(['order'])
  }

  async onClickMap(){
    dataControl.mapId = this.nameId.value;
    dataControl.date = this.date.value;
    dataControl.timeId = this.timeId.value;
    if(this.validate()){
      this.api.getSeat(this.nameId.value, this.date.value, this.timeId.value).subscribe(data=>{
        UIService.setLoading(true);
        setTimeout(()=>{
          dataControl.seat = data.data;
          this.route.navigate(['map'])
          UIService.setLoading(false);
        },1000)
      })
    }
  }

  validate(){
    if(!!this.nameId.value && !!this.date.value && !!this.timeId.value){
      return true;
    }else{
      if(!this.date.value) this.date.setErrors(Validators.required)
      if(!this.nameId.value) this.nameId.setErrors(Validators.required)
      if(!this.timeId.value) this.timeId.setErrors(Validators.required)
    }
    return false;
  }

}
