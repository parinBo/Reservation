import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export  class UIService{
  private static loading:Subject<boolean> = new Subject<boolean>();

  static setLoading(bool: boolean){
    this.loading.next(bool);
  }

  static getLoading(){
    return this.loading;
  }
}
