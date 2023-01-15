import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataControl, Seat } from 'src/app/models/data';
import { ReservationService } from 'src/app/services/reservation.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { UIService } from 'src/app/shared/ui.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  get map(){ return dataControl.mapId}
  get seat(){ return dataControl.seat}
  get mapName(){ return dataControl?.listBuilding?.find(e=>e.id === this.map)?.name || 'Wrong'}
  get mapTime(){ return `ช่วงเวลา: ${this.listTimes.find(e=>e.id === parseInt(dataControl?.timeId))?.time || ''}` }
  status:any[] = ['#D9D9D9','#FF7E7E','#7EA7FF'];
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
  seatId = 0;

  constructor(private modal: ModalService,
    private route:Router,
     private toast:ToastService,
     private api: ReservationService) { }

  ngOnInit(): void {
    setTimeout(() => {
      if(this.mapName === 'Wrong'){
        // this.route.navigate(['/'])
      }
    }, 1000);
  }

  onClick(id:any){
    const check = this.seat.find(e=> e.status === 2)?.status;
    if(check || this.getStatus(id) === this.status[1]){
      this.modal.open('map','ไม่สามารถจองได้<br>โปรดเลือกช่วงเวลาอื่น หรือ พื้นที่อื่น', false)
    }else{
      this.seatId = id;
      this.modal.open('map','ยืนยันการจอง')
    }
  }

  async onAccept(){
    const data = {
      map: dataControl.mapId,
      date: dataControl.date,
      timeId: dataControl.timeId,
      seatId: this.seatId,
      nameId: dataControl.mapId
    }
    UIService.setLoading(true);
    this.api.reservation(data).subscribe(response=>{
      UIService.setLoading(false);
      if(response.msg === 'success' ){
        this.toast.showToast('success','s')
        dataControl.seat = response.data;
      }
    })

  }

  getStatus(e:any){
    const data = this.seat?.find(data=>data.id === e);
    if(data){
      return this.status[data.status];
    }
    return this.status[0];
  }

}
