import { Component, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-speciality-image-add-dialog',
  templateUrl: './speciality-image-add-dialog.component.html',
  styleUrl: './speciality-image-add-dialog.component.css'
})
export class SpecialityImageAddDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SpecialityImageAddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: SpecialityDialogData) { }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: "specialties",
    action: "UploadSpecialityImageForSpecialityCard",
    explanation: "Uzmanlık kartı için bir adet resim seçiniz veya sürükleyip bırakınız.",
    accept: ".png, .jpg, .jpeg, .gif",
    multiple: false,
    queryString: `id=${this.data.id}`,
    optionalFileName: this.data.title
  };

}

export interface SpecialityDialogData {
  id: string;
  title: string;
}
