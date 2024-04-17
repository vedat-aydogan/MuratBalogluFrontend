import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { PatientCommentAddModel } from '../../../../contracts/models/patient-comment-add-model';
import { PatientCommentService } from '../../../../services/common/models/patient-comment.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-patient-comment-add',
  templateUrl: './patient-comment-add.component.html',
  styleUrl: './patient-comment-add.component.css'
})
export class PatientCommentAddComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private patientCommentService: PatientCommentService) { }

  patientCommentForm: FormGroup;

  createPatientCommentForm(): void {
    this.patientCommentForm = this.formbuilder.group({
      patientName: ["", Validators.required],
      disease: ["", Validators.required],
      patientReview: ["", Validators.required]
    });
  }

  addPatientComment() {
    const patientCommentAddModel: PatientCommentAddModel = new PatientCommentAddModel();
    patientCommentAddModel.patientName = this.patientCommentForm.value.patientName;
    patientCommentAddModel.disease = this.patientCommentForm.value.disease;
    patientCommentAddModel.patientReview = this.patientCommentForm.value.patientReview;

    if (this.patientCommentForm.valid) {
      this.spinnerService.show();

      this.patientCommentService.addPatientComment(patientCommentAddModel).subscribe({
        next: (data: any) => {
          this.spinnerService.hide();

          this.createPatientCommentForm();

          this.alertifyService.message("Hasta Yorumu başarılı bir şekilde eklenmiştir.", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          });
        },
        error: (error: HttpErrorResponse) => {
          this.spinnerService.hide();

          this.alertifyService.message(error.error, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          });
        }
      });
    } else {
      this.alertifyService.message("Hiç bir alan boş bırakılamaz ...", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopCenter,
        delay: 5
      });
    }
  }

  ngOnInit(): void {
    this.createPatientCommentForm();
  }

}
