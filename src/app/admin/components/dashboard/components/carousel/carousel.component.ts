import { Component, OnInit, Output } from '@angular/core';
import { FileUploadOptions } from '../../../../../services/common/file-upload/file-upload.component';
import { HomeService } from '../../../../../services/common/models/home.service';
import { AlertifyService, MessageType, Position } from '../../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarouselImageModel } from '../../../../../contracts/models/carousel-image-model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../../../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {

  constructor(private homeService: HomeService,
    private alertifyService: AlertifyService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog) { }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: "home",
    action: "uploadcarouselimages",
    explanation: "Slider için resim seçin veya sürükleyip bırakın. Birden çok resim seçilebilir.",
    accept: ".png, .jpg, .jpeg, .gif",
    multiple: true,
    optionalFileName: "ortopedi-ve-travmatoloji-uzmanligi"
  };

  carouselImages: CarouselImageModel[];

  getCarouselImages() {
    this.spinnerService.show();

    this.homeService.getCarouselImages().subscribe({
      next: (data: CarouselImageModel[]) => {
        this.carouselImages = data;

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

  deleteCarouselImage(id: string, fileName: string) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        this.homeService.deleteCarouselImage(id, fileName).subscribe({
          next: (data: any) => {
            this.alertifyService.message(data.message, {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            });
            this.getCarouselImages();
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

  ngOnInit(): void {
    this.getCarouselImages();
  }

}
