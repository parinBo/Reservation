import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogin(){
    return !!localStorage.getItem('token')
  }

  async user(){
    return  await jwt.default(localStorage.getItem('token') as string);
  }
}
