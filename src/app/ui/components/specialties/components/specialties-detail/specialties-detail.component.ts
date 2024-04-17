import { Component, Input, OnInit } from '@angular/core';
import { SpecialityService } from '../../../../../services/common/models/speciality.service';
import { SpecialityDetailModel } from '../../../../../contracts/models/speciality-detail-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-specialties-detail',
  templateUrl: './specialties-detail.component.html',
  styleUrl: './specialties-detail.component.css'
})
export class SpecialtiesDetailComponent implements OnInit {

  constructor(private specialityService: SpecialityService) { }

  @Input() detailUrl: string;
  specialityDetail: SpecialityDetailModel;

  urlChanged(detailUrl: string) {
    this.getSpecialityDetailByDetailUrl(detailUrl);
  }

  getSpecialityDetailByDetailUrl(detailUrl: string): void {
    this.specialityService.getSpecialityDetailByDetailUrl(detailUrl).subscribe({
      next: (data: SpecialityDetailModel) => {
        this.specialityDetail = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getSpecialityDetailByDetailUrl(this.detailUrl);
  }

}
