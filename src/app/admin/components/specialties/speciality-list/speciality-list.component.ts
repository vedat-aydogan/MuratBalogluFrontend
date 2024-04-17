import { Component, OnInit } from '@angular/core';
import { SpecialityService } from '../../../../services/common/models/speciality.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { SpecialityModel } from '../../../../contracts/models/speciality-model';
import { SpecialityWithCardImageModel } from '../../../../contracts/models/speciality-with-card-image-model';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteDialogComponent, DeleteState } from '../../../../dialogs/delete-dialog/delete-dialog.component';
import { SpecialityImageAddDialogComponent } from '../../../../dialogs/speciality-image-add-dialog/speciality-image-add-dialog.component';
import { SpecialityImageListDialogComponent } from '../../../../dialogs/speciality-image-list-dialog/speciality-image-list-dialog.component';

@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrl: './speciality-list.component.css'
})
export class SpecialityListComponent implements OnInit {

  constructor(
    private specialityService: SpecialityService,
    private alertifyService: AlertifyService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  specialties: SpecialityModel[];
  specialityWithCardImage: SpecialityWithCardImageModel[];

  addSpecialityImage(id: string, title: string): void {
    const dialogRef = this.dialog.open(SpecialityImageAddDialogComponent, {
      data: { id: id, title: title }
    });
  }

  uploadSpecialityImages(id: string, title: string) {
    const dialogRef = this.dialog.open(SpecialityImageListDialogComponent, {
      data: { id: id, title: title }
    });
  }

  getSpecialties() {
    this.spinnerService.show();

    this.specialityService.getSpecialties().subscribe({
      next: (data: SpecialityModel[]) => {
        this.specialties = data;

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.alertifyService.message(error.error, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      },
    });
  }

  getSpecialtiesWithCardImage() {
    this.spinnerService.show();

    this.specialityService.getSpecialtiesWithCardImage().subscribe({
      next: (data: SpecialityWithCardImageModel[]) => {
        this.specialityWithCardImage = data;

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.alertifyService.message(error.error, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      },
    });
  }

  deleteSpeciality(id: string) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == DeleteState.Yes) {
        this.specialityService.deleteSpeciality(id).subscribe({
          next: (data: any) => {
            this.alertifyService.message("Silme işlemi başarı ile gerçekleşmiştir.", {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            });
            this.getSpecialtiesWithCardImage();
          },
          error: (error: HttpErrorResponse) => {
            this.alertifyService.message(error.error, {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight
            });
          }
        });
      }

    });

  }

  //SpecialityModel parametereden gonderilecek.
  updateSpeciality() {
    const specialityModel: SpecialityModel = new SpecialityModel();
    specialityModel.id = "954C61E2-82FC-4A9B-7AA4-08DC0FC9C2F2"
    specialityModel.title = "Title 6";
    specialityModel.context = "Context 6";

    this.specialityService.updateSpeciality(specialityModel).subscribe({
      next: (data: any) => {
        this.alertifyService.message("Başarı ile güncellenmiştir.", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
      },
      error: (error: HttpErrorResponse) => {
        this.alertifyService.message(error.message, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    });
  }

  ngOnInit(): void {
    this.getSpecialtiesWithCardImage();
  }

}
