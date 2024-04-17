import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos.component';
import { SafePipe } from '../../../pipes/ui/safe.pipe';



@NgModule({
  declarations: [
    VideosComponent,
    SafePipe
  ],
  imports: [
    CommonModule
  ]
})
export class VideosModule { }
