import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoAddModel } from '../../../contracts/models/video-add-model';
import { VideoService } from '../../../services/common/models/video.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { VideoModel } from '../../../contracts/models/video-model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr-service';

@Component({
  selector: 'app-admin-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
    private videoService: VideoService,
    private spinnerService: NgxSpinnerService,
    private toastrService: CustomToastrService,
    public dialog: MatDialog) { }

  videos: VideoModel[];
  videoForm: FormGroup;

  createVideoForm(): void {
    this.videoForm = this.formbuilder.group({
      title: ["", Validators.required],
      link: ["", Validators.required]
    });
  }

  addVideo() {
    const videoAddModel: VideoAddModel = new VideoAddModel();
    videoAddModel.title = this.videoForm.value.title;
    videoAddModel.link = this.videoForm.value.link;

    if (this.videoForm.valid) {
      this.spinnerService.show();

      this.videoService.addVideo(videoAddModel).subscribe({
        next: (data: any) => {
          this.spinnerService.hide();

          this.createVideoForm();

          this.getVideos();

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

  getVideos() {
    this.spinnerService.show();

    this.videoService.getVideos().subscribe({
      next: (data: VideoModel[]) => {
        this.videos = data;
        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.toastrService.message(error.error.message, "Hata!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
        });
      }
    });
  }

  deleteVideo(id: string) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == DeleteState.Yes) {
        this.spinnerService.show();
        this.videoService.deleteVideo(id).subscribe({
          next: (data: any) => {
            this.spinnerService.hide();

            this.toastrService.message("Silme işlemi gerçekleşmiştir", "Başarılı", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopCenter,
              timeOut: 4000
            });

            this.getVideos();
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

  // safeHtml(iframe: string) {
  //   return this.videoService.safeHtml(iframe);
  // }

  ngOnInit(): void {
    this.createVideoForm();
    this.getVideos();
  }

}
