import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() id!: string;
  @Input() head: string = 'แจ้งเตือน';
  @Input() message!: string;
  @Input() footerFlag: boolean = true;
  @Output() okBtn = new EventEmitter();
  constructor(private ele: ElementRef, private modalService: ModalService) {
  }

  set msg(data: string){
    this.message = data;
  }

  set footer(bool:boolean){
    this.footerFlag = bool;
  }

  ngOnInit(): void {
    this.modalService.add(this)
  }

  open(){
    const backdrop =document.createElement('div');
    backdrop.classList.add('modal-backdrop','show');
    document.body.appendChild(backdrop);
    this.modalAdjust('show', 'block', 'add');

  }

  okBtnClick(){
    this.okBtn.emit(true);
    this.close();
  }


  close(){
   this.modalAdjust('show', 'none', 'remove');
    document.querySelector('.modal-backdrop')?.remove()
  }

  private  modalAdjust(className:string, display: string,option: string){
    const modal = (this.ele.nativeElement as HTMLElement).querySelector('.modal');
    if(option === 'remove'){
      modal?.classList.remove(className);
    }else{
      modal?.classList.add(className,'fadeIn');
    }
    (modal as HTMLElement).style.display = display;
  }

}
