import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PatientCommentModel } from '../../contracts/models/patient-comment-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientCommentService } from '../../services/common/models/patient-comment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReloadService } from '../../services/common/reload.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr-service';

@Component({
  selector: 'app-patient-comment-update-dialog',
  templateUrl: './patient-comment-update-dialog.component.html',
  styleUrl: './patient-comment-update-dialog.component.css'
})
export class PatientCommentUpdateDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PatientCommentUpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PatientCommentModel,
    private formbuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private patientCommentService: PatientCommentService,
    private reloadService: ReloadService
  ) { }

  patientCommentUpdateForm: FormGroup;

  updatePatientCommentForm(): void {
    this.patientCommentUpdateForm = this.formbuilder.group({
      patientName: [this.data.patientName, Validators.required],
      disease: [this.data.disease, Validators.required],
      patientReview: [this.data.patientReview, Validators.required]
    });
  }

  updatePatientComment() {
    const patientCommentModel: PatientCommentModel = new PatientCommentModel();
    patientCommentModel.id = this.data.id
    patientCommentModel.patientName = this.patientCommentUpdateForm.value.patientName;
    patientCommentModel.disease = this.patientCommentUpdateForm.value.disease;
    patientCommentModel.patientReview = this.patientCommentUpdateForm.value.patientReview;

    if (this.patientCommentUpdateForm.valid) {
      this.spinnerService.show();

      this.patientCommentService.updatePatientComment(patientCommentModel).subscribe({
        next: (data: any) => {
          this.spinnerService.hide();

          this.dialogRef.close();

          this.reloadService.reload();

          this.toastrService.message("Güncelleme işlemi gerçekleşmiştir", "Başarılı", {
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
    this.updatePatientCommentForm();
  }

}

// export interface PatientCommentDialogData {
//   id: string;
//   patientName: string;
//   disease: string;
//   patientReview: string;
//   createdDate: Date;
//   updatedDate: Date;
// }
