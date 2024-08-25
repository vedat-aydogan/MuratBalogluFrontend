//Bu Component kullanılmıyor artık. HomeAboutMeAdd componente taşınmıştır.
import { Component, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-about-me-image-add',
  templateUrl: './about-me-image-add.component.html',
  styleUrl: './about-me-image-add.component.css'
})
export class AboutMeImageAddComponent {

  constructor(public dialog: MatDialog) { }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: "aboutme",
    action: "upload",
    explanation: "Anasayfadaki hakkında kısmında gösterilecek olan hakkında resmi için resim ekleyin veya sürükleyip bırakın. ",
    accept: ".png, .jpg, .jpeg, .gif",
    multiple: true,
    optionalFileName: "op-dr-murat-baloglu-hakkinda"
  };

}
//Bu Component kullanılmıyor artık. HomeAboutMeAdd componente taşınmıştır.
