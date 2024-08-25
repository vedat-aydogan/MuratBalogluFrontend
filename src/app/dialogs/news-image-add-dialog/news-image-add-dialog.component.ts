import { Component, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-news-image-add-dialog',
  templateUrl: './news-image-add-dialog.component.html',
  styleUrl: './news-image-add-dialog.component.css'
})
export class NewsImageAddDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NewsImageAddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: NewsDialogData) { }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: "news",
    action: "UploadNewsImageForNews",
    explanation: "Haber için bir adet resim seçiniz veya sürükleyip bırakınız.",
    accept: ".png, .jpg, .jpeg, .gif",
    multiple: false,
    queryString: `id=${this.data.id}`,
    optionalFileName: "op-dr-murat-baloglu-haber"
    // optionalFileName: this.data.title
  };

}

export interface NewsDialogData {
  id: string;
  title: string;
}