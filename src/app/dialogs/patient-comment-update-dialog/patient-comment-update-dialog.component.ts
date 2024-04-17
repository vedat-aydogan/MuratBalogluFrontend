import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PatientCommentModel } from '../../contracts/models/patient-comment-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { PatientCommentService } from '../../services/common/models/patient-comment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReloadService } from '../../services/common/reload.service';

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
    private alertifyService: AlertifyService,
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

          this.alertifyService.message("Hasta Yorumu başarılı bir şekilde güncellenmiştir.", {
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
