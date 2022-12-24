import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API } from "../config/api";
import { API_MAIN } from "../config/constant";
import { ResponseModel } from "../models/data";
import { User } from "../models/user";

@Injectable()
export class ReservationService {

  constructor(private http:HttpClient){}


  createUser(user: User): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(API_MAIN.PATH + API.user.createUser,user);
  }

  signin(user: {username:string, password:string}){
    return this.http.post(API_MAIN.PATH + API.user.signin,user);
  }

}
