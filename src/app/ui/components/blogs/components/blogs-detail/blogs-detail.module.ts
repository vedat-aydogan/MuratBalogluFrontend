import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsDetailComponent } from './blogs-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BlogsDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BlogsDetailModule { }
