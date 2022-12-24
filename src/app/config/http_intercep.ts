import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable,  tap,  throwError } from "rxjs";
import { ToastService } from "../shared/toast/toast.service";

@Injectable()
export class HTTP_Interceptor implements HttpInterceptor{
  constructor(private toasl:ToastService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(event.headers);
          console.log(event.headers.get('Set-Cookie'));
          console.log(event.headers.get('X-JWT'));
        }
      }),
      catchError((err) => {
        if(err){
          this.toasl.showToast(`${err.statusText+' '+err.error.data}`,'e')
        }
        return throwError(err);
      })
    );
  }

}
