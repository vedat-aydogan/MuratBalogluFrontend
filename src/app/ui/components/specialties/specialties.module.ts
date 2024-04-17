import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialtiesDetailModule } from './components/specialties-detail/specialties-detail.module';
import { RouterModule } from '@angular/router';
import { SpecialtiesComponent } from './specialties.component';




@NgModule({
  declarations: [
    SpecialtiesComponent
  ],
  imports: [
    CommonModule,
    SpecialtiesDetailModule,
    RouterModule
  ]
})
export class SpecialtiesModule { }
