import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  @ViewChild('modal')modalElement!: ElementRef;
  constructor(private ele: ElementRef, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.modalService.add(this)
  }

  open(msg = '', footer:boolean){
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop','show');
    document.body.appendChild(backdrop);
    this.modalAdjust('fadeIn', 'block', 'add');
    this.message = msg;
    this.footerFlag = footer;
  }

  onBtnOkClick(){
    this.okBtn.emit(true);
    this.close();
  }

  close(){
   this.modalAdjust('fadeIn', 'none', 'remove');
    document.querySelector('.modal-backdrop')?.remove()
  }


  private  modalAdjust(className:string, display: string,option: string){
    const modal = this.modalElement.nativeElement
    modal?.classList[option](className);
    (modal as HTMLElement).style.display = display;
  }

}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

