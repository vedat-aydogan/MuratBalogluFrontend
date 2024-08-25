import { Component, OnInit } from '@angular/core';
import { PatientCommentService } from '../../../../services/common/models/patient-comment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { PatientCommentModel } from '../../../../contracts/models/patient-comment-model';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteDialogComponent, DeleteState } from '../../../../dialogs/delete-dialog/delete-dialog.component';
import { PatientCommentUpdateDialogComponent } from '../../../../dialogs/patient-comment-update-dialog/patient-comment-update-dialog.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr-service';

@Component({
  selector: 'app-patient-comment-list',
  templateUrl: './patient-comment-list.component.html',
  styleUrl: './patient-comment-list.component.css'
})
export class PatientCommentListComponent implements OnInit {

  constructor(
    private patientCommentService: PatientCommentService,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  patientComments: PatientCommentModel[];
  patientComment: PatientCommentModel;

  getPatientComments() {
    this.spinnerService.show();

    this.patientCommentService.getPatientComments().subscribe({
      next: (data: PatientCommentModel[]) => {
        this.patientComments = data;

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.toastrService.message(error.error.message, "Hata!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
        });
      },
    });
  }

  deletePatientComment(id: string) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == DeleteState.Yes) {
        this.spinnerService.show();
        this.patientCommentService.deletePatientComment(id).subscribe({
          next: (data: any) => {
            this.spinnerService.hide();

            this.toastrService.message(data.message, "Başarılı", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopCenter,
              timeOut: 4000
            });

            this.getPatientComments();
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
      }
    });

  }

  updatePatientComment(patientComment: PatientCommentModel): void {
    this.dialog.open(PatientCommentUpdateDialogComponent, {
      data: { id: patientComment.id, patientName: patientComment.patientName, disease: patientComment.disease, patientReview: patientComment.patientReview },
      width: '850px',
      // height: '400px'      
    });
  }

  ngOnInit(): void {
    this.getPatientComments();
  }

}
