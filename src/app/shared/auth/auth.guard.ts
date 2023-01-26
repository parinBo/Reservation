import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      let data: { [key: string]: string } = {};
      if(localStorage.getItem('token')){
        data =  jwt.default(localStorage.getItem('token') as string);
      }
    if (this.authService.isLogin()) {
      if(route.data['role']) {
        if(route.data['role'] === data['role']) {
          return true;
        }else {
          this.route.navigate(['']);
        }
      }else {
        return true;
      }
      return false
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
