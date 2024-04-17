import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { SafePipe } from '../../../pipes/ui/contact/safe.pipe';



@NgModule({
  declarations: [
    ContactComponent,
    SafePipe
  ],
  imports: [
    CommonModule
  ]
})
export class ContactModule { }
