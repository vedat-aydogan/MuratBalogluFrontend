import { Component, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-blog-image-add-dialog',
  templateUrl: './blog-image-add-dialog.component.html',
  styleUrl: './blog-image-add-dialog.component.css'
})
export class BlogImageAddDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BlogImageAddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: BlogDialogData) { }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: "blogs",
    action: "UploadBlogImageForBlogCard",
    explanation: "Resim seçiniz veya sürükleyip bırakınız. İdeal ölçüler 800px/357px yada 900px/402px dir.",
    accept: ".png, .jpg, .jpeg, .gif",
    multiple: false,
    queryString: `id=${this.data.id}`,
    optionalFileName: this.data.title
  };

}

export interface BlogDialogData {
  id: string;
  title: string;
}
