import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from './languages.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LanguagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LanguagesModule { }
