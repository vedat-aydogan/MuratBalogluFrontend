import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewsModel } from '../../contracts/models/news-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr-service';
import { NewsService } from '../../services/common/models/news.service';
import { ReloadService } from '../../services/common/reload.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-news-update-dialog',
  templateUrl: './news-update-dialog.component.html',
  styleUrl: './news-update-dialog.component.css'
})
export class NewsUpdateDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NewsUpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: NewsModel,
    private formbuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private newsService: NewsService,
    private reloadService: ReloadService
  ) { }

  newsUpdateForm: FormGroup;
  submitted: boolean;

  get component() {
    return this.newsUpdateForm.controls;
  }

  updateNewsForm(): void {
    this.newsUpdateForm = this.formbuilder.group({
      title: [this.data.title, Validators.required],
      link: [this.data.link, Validators.required]
    });
  }

  updateNews() {
    this.submitted = true;
    if (this.newsUpdateForm.invalid)
      return;

    this.spinnerService.show();

    const newsModel: NewsModel = new NewsModel();
    newsModel.id = this.data.id
    newsModel.title = this.newsUpdateForm.value.title;
    newsModel.link = this.newsUpdateForm.value.link;

    this.newsService.updateNews(newsModel).subscribe({
      next: async (data: any) => {
        this.spinnerService.hide();

        this.dialogRef.close();

        await this.reloadService.reloadAsync();

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

  }

  ngOnInit(): void {
    this.updateNewsForm();
  }

}
