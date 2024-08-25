import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from '../../../dialogs/dialogs.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RolesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DialogsModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class RolesModule { }
