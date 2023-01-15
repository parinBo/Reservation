import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable,  tap,  throwError } from "rxjs";
import { ToastService } from "../shared/toast/toast.service";

@Injectable()
export class HTTP_Interceptor implements HttpInterceptor{
  constructor(private toasl:ToastService, private router: Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }),
      catchError((err) => {
        if(err){
          if (err.status === 401) {
            localStorage.removeItem('token')
            this.router.navigate(['/login']);
          }
          this.toasl.showToast(`${err.statusText+' '+err.error.data}`,'e')
        }
        return throwError(err);
      })
    );
  }

}
