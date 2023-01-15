import { Injectable } from "@angular/core";
import { ModalComponent } from "./modal.component";

@Injectable({providedIn:'root'})
export class ModalService{
  private modals: ModalComponent[] = [];

  add(modal: any) {
      this.modals.push(modal);
  }

  remove(id: string) {
      this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string,msg: string,footer = true) {
      const modal = this.modals.find(x => x.id === id);
      if(modal){
        modal.open(msg, footer);
      }
  }

  close(id: string) {
      const modal = this.modals.find(x => x.id === id);
      if(modal){
        modal.close();
      }
  }
}
