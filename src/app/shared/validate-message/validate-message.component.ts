import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { VALIDATE_MESSAGES } from 'src/app/config/validate_message';

@Component({
  selector: 'validate-message',
  templateUrl: './validate-message.component.html',
  styleUrls: ['./validate-message.component.scss']
})
export class ValidateMessageComponent implements OnInit {

  @Input() control!:AbstractControl | null;
  constructor() { }

  ngOnInit(): void {
  }

  get message(){
    let msg  = '';
    if(this.control?.invalid && (this.control.touched || this.control.dirty)){
      for(const error in this.control?.errors){
        msg = this.errorMessage(error)
      }
    }
    return msg;
  }

  errorMessage(errorName: string){
    const err: {[key: string]:any} = VALIDATE_MESSAGES
    return err[errorName];
  }

}
