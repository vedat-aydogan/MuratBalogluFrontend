import { Component, OnInit } from '@angular/core';
import { PatientCommentService } from '../../../services/common/models/patient-comment.service';
import { PatientCommentModel } from '../../../contracts/models/patient-comment-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-patient-comments',
  templateUrl: './patient-comments.component.html',
  styleUrl: './patient-comments.component.css'
})
export class PatientCommentsComponent implements OnInit {

  constructor(private patientCommentService: PatientCommentService) { }

  patientComments: PatientCommentModel[];

  getPatientComments(): void {
    this.patientCommentService.getPatientComments().subscribe({
      next: (data: PatientCommentModel[]) => {
        this.patientComments = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getPatientComments();
  }

}
