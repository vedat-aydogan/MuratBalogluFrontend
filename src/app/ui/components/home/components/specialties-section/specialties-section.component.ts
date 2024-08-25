import { Component, OnInit } from '@angular/core';
import { SpecialityService } from '../../../../../services/common/models/speciality.service';
import { SpecialityWithCardImageModel } from '../../../../../contracts/models/speciality-with-card-image-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-specialties-section',
  templateUrl: './specialties-section.component.html',
  styleUrl: './specialties-section.component.css'
})
export class SpecialtiesSectionComponent implements OnInit {

  constructor(private specialityService: SpecialityService) { }

  specialityWithCardImage: SpecialityWithCardImageModel[];

  getLastNineSpecialityWithCardImage(): void {
    this.specialityService.getLastNineSpecialityWithCardImage().subscribe({
      next: (data: SpecialityWithCardImageModel[]) => {
        this.specialityWithCardImage = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  // getSpecialtiesWithCardImage(): void {
  //   this.specialityService.getSpecialtiesWithCardImage().subscribe({
  //     next: (data: SpecialityWithCardImageModel[]) => {
  //       this.specialityWithCardImage = data;
  //     },
  //     error: (error: HttpErrorResponse) => { }
  //   });
  // }

  ngOnInit(): void {
    this.getLastNineSpecialityWithCardImage();
  }

}
