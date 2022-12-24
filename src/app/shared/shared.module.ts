import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ValidateMessageComponent } from "./validate-message/validate-message.component";
import { LoaderComponent } from './loader/loader.component';
import { ToastComponent } from './toast/toast.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations:[
    ValidateMessageComponent, LoaderComponent, ToastComponent, ModalComponent
  ],
  providers:[],
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,],
  exports:[
    ValidateMessageComponent,LoaderComponent,ToastComponent,ModalComponent
  ]
})
export class SharedModule{}
