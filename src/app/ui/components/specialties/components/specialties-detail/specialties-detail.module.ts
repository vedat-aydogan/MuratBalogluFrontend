import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialtiesDetailComponent } from './specialties-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SpecialtiesDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SpecialtiesDetailModule { }
