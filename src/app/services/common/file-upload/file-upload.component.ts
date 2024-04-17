import { Component, Input } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReloadService } from '../reload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog,
    private reloadService: ReloadService
  ) { }

  @Input() options: Partial<FileUploadOptions>;

  public files: NgxFileDropEntry[];

  public selectedFiles(files: NgxFileDropEntry[]) {

    this.files = files;

    const fileData: FormData = new FormData();

    for (const file of files) {

      if (this.options.optionalFileName) {
        const extension = file.relativePath.split('.').pop();
        file.relativePath = `${this.options.optionalFileName}.${extension}`;
      }

      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });

    }

    const dialogRef = this.dialog.open(FileUploadDialogComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerService.show();

        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe({
          next: (data: any) => {
            //reload fonksiyonu geriye observable döndüreceği zaman if içindekilerin tamamını next içine at. if sil sonra
            const result = this.reloadService.reload();
            if (result) {
              this.spinnerService.hide();

              this.dialog.closeAll();

              this.alertifyService.message("Yükleme işlemi basari ile gerçekleşmiştir.", {
                dismissOthers: true,
                messageType: MessageType.Success,
                position: Position.TopRight
              });
            }

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
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  multiple: boolean;
  optionalFileName?: string; //relativePath yani orjinal file name i değiştirmek istiyorsan buraya atama yap. File name format işlemleri backend de yapılmaktadır.
}
