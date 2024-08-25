import { Component, OnInit } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { NewsService } from '../../../services/common/models/news.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NewsModel } from '../../../contracts/models/news-model';
import { NewsWithCardImageModel } from '../../../contracts/models/news-with-card-image-model';
import { NewsImageAddDialogComponent } from '../../../dialogs/news-image-add-dialog/news-image-add-dialog.component';
import { DeleteDialogComponent, DeleteState } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsAddModel } from '../../../contracts/models/news-add-model';
import { NewsUpdateDialogComponent } from '../../../dialogs/news-update-dialog/news-update-dialog.component';

@Component({
  selector: 'app-admin-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {

  constructor(
    private newsService: NewsService,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService,
    private formbuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  news: NewsModel[];
  newsWithCardImageList: NewsWithCardImageModel[];
  newsForm: FormGroup
  submitted: boolean;

  get component() {
    return this.newsForm.controls;
  }

  createNewsForm(): void {
    this.newsForm = this.formbuilder.group({
      title: ["", Validators.required],
      link: ["", Validators.required],
    });
  }

  addNews() {
    this.submitted = true;
    if (this.newsForm.invalid)
      return;

    this.spinnerService.show();

    const newsAddModel: NewsAddModel = new NewsAddModel();
    newsAddModel.title = this.newsForm.value.title;
    newsAddModel.link = this.newsForm.value.link;

    this.newsService.addNews(newsAddModel).subscribe({
      next: (data: any) => {
        this.spinnerService.hide();

        this.submitted = false;
        this.createNewsForm();
        this.getNewsWithCardImage();

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

  }

  addNewsImage(id: string, title: string): void {
    const dialogRef = this.dialog.open(NewsImageAddDialogComponent, {
      data: { id: id, title: title }
    });
  }

  deleteNews(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        this.spinnerService.show();
        this.newsService.deleteNews(id).subscribe({
          next: () => {
            this.spinnerService.hide();

            this.toastrService.message("Silme işlemi gerçekleşmiştir", "Başarılı", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopCenter,
              timeOut: 4000
            });
            this.getNewsWithCardImage();
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

  getNewsWithCardImage() {
    this.spinnerService.show();

    this.newsService.getNewsWithCardImage().subscribe({
      next: (data: NewsWithCardImageModel[]) => {
        this.newsWithCardImageList = data;

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

  updateNews(news: NewsModel): void {
    this.dialog.open(NewsUpdateDialogComponent, {
      data: { id: news.id, title: news.title, link: news.link },
      width: '850px',
      // height: '400px'      
    });
  }

  ngOnInit(): void {
    this.createNewsForm();
    this.getNewsWithCardImage();
  }

}
