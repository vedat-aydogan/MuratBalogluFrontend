import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientCommentAddModel } from '../../../../contracts/models/patient-comment-add-model';
import { PatientCommentService } from '../../../../services/common/models/patient-comment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr-service';

@Component({
  selector: 'app-patient-comment-add',
  templateUrl: './patient-comment-add.component.html',
  styleUrl: './patient-comment-add.component.css'
})
export class PatientCommentAddComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private toastrService: CustomToastrService,
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

          this.toastrService.message("Yükleme işlemi gerçekleşmiştir", "Başarılı", {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopCenter,
            timeOut: 4000
          });
        },
        error: (error: HttpErrorResponse) => {
          if ((error.status != 401) && (error.status != 403) && (error.status != 500)) {
            this.spinnerService.hide();

            this.toastrService.message(error.error.message, "Hata!", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopCenter,
              timeOut: 4000
            });
          }
        }
      });
    } else {
      this.toastrService.message("Hiç bir alan boş bırakılamaz ...", "Hata!", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopCenter,
        timeOut: 4000
      });
    }
  }

  ngOnInit(): void {
    this.createPatientCommentForm();
  }

}
