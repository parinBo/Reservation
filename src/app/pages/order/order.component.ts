import { Component, OnInit } from '@angular/core';
import { dataControl, OrderTable } from 'src/app/models/data';
import { ReservationService } from 'src/app/services/reservation.service';
import * as moment from 'moment';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { UIService } from 'src/app/shared/ui.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  data:OrderTable[] = [];
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

  constructor(private api: ReservationService,
    private route: Router,
    private toast: ToastService) { }

  ngOnInit(): void {
    this.api.getMyOrders().subscribe(response =>{
      if(response.msg = 's'){
        this.data = response.data;
      }
    })
  }

  onClickShow(e:OrderTable){
    console.log(e)
    const dateTime = moment(e.startTime).format('YYYY-MM-DDTHH:mm').split('T');
    const timeId = this.listTimes.find(e=> e.time.split('-')[0].includes(dateTime[1].replace(':','.')))?.id;
    this.api.getSeat(e.placeId, dateTime[0], timeId).subscribe(data=>{
      UIService.setLoading(true);
      setTimeout(()=>{
        dataControl.mapId = e.placeId;
        dataControl.timeId = timeId;
        dataControl.seat = data.data;
        this.route.navigate(['map'])
        UIService.setLoading(false);
      },1000)
    })
  }
  onclickDelete(e:OrderTable){
    const  data = {...e};
    data.startTime = moment(e.startTime).add(7,'h').toISOString().replace('Z','')
    data.endTime = moment(e.endTime).add(7,'h').toDate();
    this.api.delMyOrder(data).subscribe(res=>{
      if(res.msg === 's'){
        this.toast.showToast('Success',res.msg)
        this.data = res.data;
      }

    })
  }

  dateFormat(date:Date | string){
    return moment(date).locale('th').format('DD-MMMM-YYYY HH:mm')
  }

}
