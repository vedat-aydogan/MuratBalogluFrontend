import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpecialityAddComponent } from './speciality-add/speciality-add.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DialogsModule } from '../../../dialogs/dialogs.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SpecialityUpdateComponent } from './speciality-update/speciality-update.component';



@NgModule({
  declarations: [
    SpecialityAddComponent,
    SpecialityListComponent,
    SpecialityUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,
    DialogsModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class SpecialtiesModule { }
