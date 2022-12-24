import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class ToastService{


  showToast(message: string,code: string) {
    const toast = document.createElement('div');
    const toastBody = document.createElement('div');
    toast.classList.add('show', 'toast' ,'align-items-center', code === 's'? 'bg-success':'bg-danger' ,'text-white'  ,'border-0' ,'my-3');
    toastBody.classList.add('toast-body','d-flex')
    toastBody.innerHTML = `${this.icon(code) + message}`
    toast.append(toastBody);
    (document.querySelector('#toast-container') as HTMLElement).appendChild(toast);
    (document.querySelector('#toast-container') as HTMLElement).appendChild(toast!);
    setTimeout(function() {
      document.querySelectorAll('.toast').forEach(e=>{
        toast!.classList.remove('show')
        setTimeout(function() {
          e.remove();
        },1500)
      })
    }, 3000);
  }

  icon(code:string){
    if(code === 's'){
      return '<i class="fa-solid fa-square-check fs-4 " style="margin-right:1rem"></i>'
    }
    else if(code === 'e'){
      return '<i class="fa-solid fa-square-xmark fs-4 " style="margin-right:1rem"></i>'
    }
    return '';
  }



}
