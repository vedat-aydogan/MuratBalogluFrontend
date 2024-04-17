import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkingHoursComponent } from './working-hours.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WorkingHoursComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    WorkingHoursComponent
  ]
})
export class WorkingHoursModule { }
