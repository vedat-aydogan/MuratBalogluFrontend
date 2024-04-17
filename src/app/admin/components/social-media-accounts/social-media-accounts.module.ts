import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaAccountsComponent } from './social-media-accounts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SocialMediaAccountsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SocialMediaAccountsComponent
  ]
})
export class SocialMediaAccountsModule { }
