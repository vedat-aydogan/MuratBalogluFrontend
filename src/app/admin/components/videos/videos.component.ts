import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoAddModel } from '../../../contracts/models/video-add-model';
import { VideoService } from '../../../services/common/models/video.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VideoModel } from '../../../contracts/models/video-model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-admin-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
    private videoService: VideoService,
    private spinnerService: NgxSpinnerService,
    private alertifyService: AlertifyService,
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

          this.alertifyService.message("Video başarılı bir şekilde eklenmiştir.", {
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
        delay: 7
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

        this.alertifyService.message(error.error, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
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
        this.videoService.deleteVideo(id).subscribe({
          next: (data: any) => {
            this.alertifyService.message("Silme işlemi başarı ile gerçekleşmiştir.", {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            });
            this.getVideos();
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

  // safeHtml(iframe: string) {
  //   return this.videoService.safeHtml(iframe);
  // }

  ngOnInit(): void {
    this.createVideoForm();
    this.getVideos();
  }

}
