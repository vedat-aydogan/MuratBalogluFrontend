import { Component, Input, OnInit } from '@angular/core';
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

  @Input() categoryUrl: string;

  specialtiesWithCardImage: SpecialityWithCardImageModel[];
  categoryName: string;

  getSpecialtiesWithCardImage(): void {
    this.specialityService.getSpecialtiesWithCardImage().subscribe({
      next: (data: SpecialityWithCardImageModel[]) => {
        this.specialtiesWithCardImage = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  getSpecialtiesByCategoryWithCardImage(categoryUrl: string): void {
    this.specialityService.getSpecialtiesByCategoryWithCardImage(categoryUrl).subscribe({
      next: (data: SpecialityWithCardImageModel[]) => {
        this.specialtiesWithCardImage = data;
        this.categoryName = data[0]?.categoryName;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    if (this.categoryUrl) {
      this.getSpecialtiesByCategoryWithCardImage(this.categoryUrl);
    }
    else {
      this.getSpecialtiesWithCardImage();
    }
  }

}
