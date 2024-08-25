import { Component, OnInit } from '@angular/core';
import { SpecialityService } from '../../../../services/common/models/speciality.service';
import { SpecialityCategoryModel } from '../../../../contracts/models/speciality-category-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private specialityService: SpecialityService) { }

  specialityCategories: SpecialityCategoryModel[];

  getSpecialityCategories(): void {
    this.specialityService.getSpecialityCategories().subscribe({
      next: (data: SpecialityCategoryModel[]) => {
        this.specialityCategories = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getSpecialityCategories();
  }

}
