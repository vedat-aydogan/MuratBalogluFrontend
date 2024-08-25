import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../../services/common/models/home.service';
import { CarouselImageModel } from '../../../../../contracts/models/carousel-image-model';
import { HttpErrorResponse } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { firstValueFrom, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-carousel-section',
  templateUrl: './carousel-section.component.html',
  styleUrl: './carousel-section.component.css'
})
export class CarouselSectionComponent implements OnInit {

  constructor(private homeService: HomeService, private spinnerService: NgxSpinnerService) { }

  carouselImages: CarouselImageModel[];
  // carouselImagesCount: number;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 1500,
    autoplayTimeout: 6000,
    autoplayHoverPause: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 1500,
    dotsSpeed: 1500,
    margin: 10,
    navText: [
      `<span class="carousel-control-prev-icon" aria-hidden="true"></span>`,
      `<span class="carousel-control-next-icon" aria-hidden="true"></span>`,
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };

  getCarouselImages(): void {
    this.homeService.getCarouselImages().subscribe({
      next: (data: CarouselImageModel[]) => {
        this.carouselImages = data;
        // this.carouselImagesCount = data.length;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  async getCarouselImagesAsync(): Promise<any> {
    this.spinnerService.show();

    const observable: Observable<CarouselImageModel[]> = this.homeService.getCarouselImages();

    await firstValueFrom(observable)
      .then((data) => {
        this.carouselImages = data;
        this.spinnerService.hide();
      })
      .catch((error: HttpErrorResponse) => { this.spinnerService.hide(); error });
  }

  // ngOnInit(): void {
  //   this.getCarouselImages();
  // }

  async ngOnInit(): Promise<void> {
    await this.getCarouselImagesAsync();
  }

}
