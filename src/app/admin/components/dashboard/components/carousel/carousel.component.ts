import { Component, OnInit, Output } from '@angular/core';
import { FileUploadOptions } from '../../../../../services/common/file-upload/file-upload.component';
import { HomeService } from '../../../../../services/common/models/home.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarouselImageModel } from '../../../../../contracts/models/carousel-image-model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../../../../dialogs/delete-dialog/delete-dialog.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../../services/common/custom-toastr-service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {

  constructor(private homeService: HomeService,
    private spinnerService: NgxSpinnerService,
    private toastrService: CustomToastrService,
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

        this.toastrService.message(error.error.message, "Hata!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
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
        this.spinnerService.show();

        this.homeService.deleteCarouselImage(id, fileName).subscribe({
          next: (data: any) => {
            this.spinnerService.hide();

            this.toastrService.message(data.message, "Başarılı", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopCenter,
              timeOut: 4000
            });
            this.getCarouselImages();
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

  ngOnInit(): void {
    this.getCarouselImages();
  }

}
