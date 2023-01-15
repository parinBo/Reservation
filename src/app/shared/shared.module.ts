import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ValidateMessageComponent } from "./validate-message/validate-message.component";
import { LoaderComponent } from './loader/loader.component';
import { ToastComponent } from './toast/toast.component';
import { ModalComponent } from './modal/modal.component';
import { BgOneComponent } from './bg-one/bg-one.component';

@NgModule({
  declarations:[
    ValidateMessageComponent,
    LoaderComponent,
    ToastComponent,
    ModalComponent,
    BgOneComponent
  ],
  providers:[],
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,],
  exports:[
    ValidateMessageComponent,
    LoaderComponent,
    ToastComponent,
    ModalComponent,
    BgOneComponent
  ]
})
export class SharedModule{}
