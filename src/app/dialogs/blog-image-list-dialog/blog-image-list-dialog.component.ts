import { Component, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-blog-image-list-dialog',
  templateUrl: './blog-image-list-dialog.component.html',
  styleUrl: './blog-image-list-dialog.component.css'
})
export class BlogImageListDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BlogImageListDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: BlogDialogData) { }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: "blogs",
    action: "Upload",
    explanation: "Blog için resim veya resimler seçiniz veya sürükleyip bırakınız.",
    accept: ".png, .jpg, .jpeg, .gif",
    multiple: true,
    queryString: `id=${this.data.id}`,
    optionalFileName: this.data.title
  };

}

export interface BlogDialogData {
  id: string;
  title: string;
}