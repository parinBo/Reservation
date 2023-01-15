import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API } from "../config/api";
import { API_MAIN } from "../config/constant";
import { OrderTable, ResponseModel } from "../models/data";
import { User } from "../models/user";
import { AuthService } from "../shared/auth/auth.service";

@Injectable()
export class ReservationService {

  constructor(private http:HttpClient,private auth:AuthService){}
  private assesToken = localStorage.getItem('token');
  private header = {Authorization: this.assesToken+''};
  createUser(user: User): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(API_MAIN.PATH + API.user.createUser,user);
  }

  signin(user: {username:string, password:string}){
    return this.http.post<ResponseModel>(API_MAIN.PATH + API.user.signin,user);
  }

  listBuilding(){
    this.header = {Authorization: localStorage.getItem('token')+''};
    return this.http.get<ResponseModel>(API_MAIN.PATH + API.info.listBuilding,{headers:this.header});
  }

  getSeat(nameId:string,date: string, timeId: number){
    const param = {nameId, date, timeId}
    return this.http.get<ResponseModel>(API_MAIN.PATH + API.seat.getSeat,{params:param,headers:this.header});
  }

  reservation(data:any){
    return this.http.post<ResponseModel>(API_MAIN.PATH + API.seat.reservation,data,{headers:this.header});
  }

  getMyOrders(){
    return this.http.get<ResponseModel>(API_MAIN.PATH + API.order.getMyOrders,{headers:this.header});
  }

  delMyOrder(data:OrderTable){
    return this.http.delete<ResponseModel>(API_MAIN.PATH + API.order.delMyOrder,{headers:this.header,body:data});
  }

}
