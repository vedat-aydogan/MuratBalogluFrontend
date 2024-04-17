import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AboutMeService } from '../../../../../services/common/models/about-me.service';
import { AboutMeWithImageModel } from '../../../../../contracts/models/about-me-with-image-model';

@Component({
  selector: 'app-about-me-section',
  templateUrl: './about-me-section.component.html',
  styleUrl: './about-me-section.component.css'
})
export class AboutMeSectionComponent implements OnInit {

  constructor(private aboutMeService: AboutMeService) { }

  aboutMeWithImage: AboutMeWithImageModel;

  getAboutMeWithImage() {
    this.aboutMeService.getAboutMeWithImage().subscribe({
      next: (data: AboutMeWithImageModel) => {
        this.aboutMeWithImage = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getAboutMeWithImage();
  }

}
