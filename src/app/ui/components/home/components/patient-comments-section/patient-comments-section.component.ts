import { Component, OnInit } from '@angular/core';
import { PatientCommentModel } from '../../../../../contracts/models/patient-comment-model';
import { PatientCommentService } from '../../../../../services/common/models/patient-comment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';

declare var $: any;

@Component({
  selector: 'app-patient-comments-section',
  templateUrl: './patient-comments-section.component.html',
  styleUrl: './patient-comments-section.component.css'
})
export class PatientCommentsSectionComponent implements OnInit {

  constructor(private patientCommentService: PatientCommentService) { }

  patientComments: PatientCommentModel[];

  getLastTwelvePatientComment(): void {
    this.patientCommentService.getLastTwelvePatientComment().subscribe({
      next: (data: PatientCommentModel[]) => {
        this.patientComments = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

   // CAROUSEL SETTING
   customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 1500,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
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
        items: 2,
      },
      940: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
    nav: true,
  };

  // patientCommentsCarousel(): void {
  //   setTimeout(() => {
  //     let items: NodeListOf<Element> = document.querySelectorAll('#recipeCarousel .carousel-item');
  //     items.forEach((el: Element) => {
  //       const minPerSlide: number = 3;
  //       let next: Element | null = el.nextElementSibling;
  //       for (let i: number = 1; i < minPerSlide; i++) {
  //         if (!next) {
  //           // wrap carousel by using first child
  //           next = items[0];
  //         }
  //         let cloneChild: Node = next.cloneNode(true);
  //         el.appendChild(cloneChild.childNodes[0]);
  //         next = next.nextElementSibling;
  //       }
  //     });
  //   }, 1000);
  // }

  ngOnInit(): void {
    this.getLastTwelvePatientComment();
  }

}
