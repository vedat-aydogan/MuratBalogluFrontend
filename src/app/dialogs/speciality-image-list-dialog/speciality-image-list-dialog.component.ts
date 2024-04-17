import { Component, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-speciality-image-list-dialog',
  templateUrl: './speciality-image-list-dialog.component.html',
  styleUrl: './speciality-image-list-dialog.component.css'
})
export class SpecialityImageListDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SpecialityImageListDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: SpecialityDialogData) { }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: "specialties",
    action: "Upload",
    explanation: "Uzmanlık için resim veya resimler seçiniz veya sürükleyip bırakınız.",
    accept: ".png, .jpg, .jpeg, .gif",
    multiple: true,
    queryString: `id=${this.data.id}`,
    optionalFileName: this.data.title
  };

}

export interface SpecialityDialogData {
  id: string;
  title: string;
}
