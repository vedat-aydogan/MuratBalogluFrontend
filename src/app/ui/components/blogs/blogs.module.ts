import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { RouterModule } from '@angular/router';
import { BlogsDetailModule } from './components/blogs-detail/blogs-detail.module';



@NgModule({
  declarations: [
    BlogsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BlogsDetailModule
  ]
})
export class BlogsModule { }
