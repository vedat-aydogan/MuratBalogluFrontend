import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutMeAddComponent } from './about-me-add/about-me-add.component';
import { HomeAboutMeAddComponent } from './home-about-me-add/home-about-me-add.component';
import { AboutMeImageAddComponent } from './about-me-image-add/about-me-image-add.component';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';



@NgModule({
  declarations: [
    AboutMeAddComponent,
    HomeAboutMeAddComponent,
    AboutMeImageAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CKEditorModule,
    ReactiveFormsModule,
    FileUploadModule
  ]
})
export class AboutMeModule { }
