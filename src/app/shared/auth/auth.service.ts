import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogin(){
    return !!localStorage.getItem('token')
  }
}
