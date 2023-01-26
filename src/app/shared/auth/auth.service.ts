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

  user(): {[key :string]: string}{
    return  jwt.default(localStorage.getItem('token') as string);

  }

  async getRole(){
    const data: { [key: string]: string } =   await jwt.default(localStorage.getItem('token') as string);
    console.log(data['role']);
    return data['role'];
  }
}
