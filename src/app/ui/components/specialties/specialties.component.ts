import { Component, OnInit } from '@angular/core';
import { SpecialityService } from '../../../services/common/models/speciality.service';
import { SpecialityWithCardImageModel } from '../../../contracts/models/speciality-with-card-image-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrl: './specialties.component.css'
})
export class SpecialtiesComponent implements OnInit {

  constructor(private specialityService: SpecialityService) { }

  specialityWithCardImage: SpecialityWithCardImageModel[];

  getSpecialtiesWithCardImage(): void {
    this.specialityService.getSpecialtiesWithCardImage().subscribe({
      next: (data: SpecialityWithCardImageModel[]) => {
        this.specialityWithCardImage = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getSpecialtiesWithCardImage();
  }

}
