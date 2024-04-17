import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { FileUploadModule } from '../../../../services/common/file-upload/file-upload.module';



@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule
  ],
  exports: [
    CarouselComponent
  ]
})
export class ComponentsModule { }
