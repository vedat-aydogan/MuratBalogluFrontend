import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientCommentAddComponent } from './patient-comment-add/patient-comment-add.component';
import { PatientCommentListComponent } from './patient-comment-list/patient-comment-list.component';



@NgModule({
  declarations: [
    PatientCommentAddComponent,
    PatientCommentListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PatientCommentsModule { }
