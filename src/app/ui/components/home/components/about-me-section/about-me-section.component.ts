import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AboutMeService } from '../../../../../services/common/models/about-me.service';
import { AboutMeWithImageModel } from '../../../../../contracts/models/about-me-with-image-model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-about-me-section',
  templateUrl: './about-me-section.component.html',
  styleUrl: './about-me-section.component.css'
})
export class AboutMeSectionComponent implements OnInit {

  constructor(private aboutMeService: AboutMeService, private spinnerService: NgxSpinnerService) { }

  aboutMeWithImage: AboutMeWithImageModel;

  getAboutMeWithImage() {
    this.spinnerService.show();

    this.aboutMeService.getAboutMeWithImage().subscribe({
      next: (data: AboutMeWithImageModel) => {
        this.aboutMeWithImage = data;
        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();
      }
    });
  }

  ngOnInit(): void {
    this.getAboutMeWithImage();
  }

}
