import { Component, OnInit } from '@angular/core';
import { AboutMeService } from '../../../services/common/models/about-me.service';
import { AboutMeModel } from '../../../contracts/models/about-me-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent implements OnInit {

  constructor(private aboutMeService: AboutMeService) { }

  aboutMe: AboutMeModel;

  getAboutMe() {
    this.aboutMeService.getAboutMe().subscribe({
      next: (data: AboutMeModel) => {
        this.aboutMe = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getAboutMe();
  }

}
