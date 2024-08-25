import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../../services/common/models/blog.service';
import { BlogModel } from '../../../../contracts/models/blog-model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { BlogImageAddDialogComponent } from '../../../../dialogs/blog-image-add-dialog/blog-image-add-dialog.component';
import { BlogWithCardImageModel } from '../../../../contracts/models/blog-with-card-image-model';
import { DeleteDialogComponent, DeleteState } from '../../../../dialogs/delete-dialog/delete-dialog.component';
import { _isAuthenticated } from '../../../../services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr-service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {

  constructor(
    private blogService: BlogService,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  blogs: BlogModel[];
  blogWithCardImage: BlogWithCardImageModel[];

  addBlogImage(id: string, title: string): void {
    const dialogRef = this.dialog.open(BlogImageAddDialogComponent, {
      data: { id: id, title: title }
    });

    dialogRef.afterClosed().subscribe(result => {
      //Proje sonunda kullanilmazsa kaldir
      //this.getBlogs();
    });
  }

  // uploadBlogImages(id: string, title: string) {
  //   const dialogRef = this.dialog.open(BlogImageListDialogComponent, {
  //     data: { id: id, title: title }
  //   });
  // }

  // uploadBlogImages(id: string, title: string) { }

  getBlogs() {
    this.spinnerService.show();

    this.blogService.getBlogs().subscribe({
      next: (data: BlogModel[]) => {
        this.blogs = data;

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.toastrService.message(error.error, "Hata!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
        });
      },
    });
  }

  getBlogsWithCardImage() {
    this.spinnerService.show();

    this.blogService.getBlogsWithCardImage().subscribe({
      next: (data: BlogWithCardImageModel[]) => {
        this.blogWithCardImage = data;

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.toastrService.message(error.error, "Hata!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
        });
      },
    });
  }

  deleteBlog(id: string) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == DeleteState.Yes) {
        this.spinnerService.show();
        this.blogService.deleteBlog(id).subscribe({
          next: () => {
            this.spinnerService.hide();

            this.toastrService.message("Silme işlemi gerçekleşmiştir", "Başarılı", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopCenter,
              timeOut: 4000
            });
            this.getBlogsWithCardImage();
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

  ngOnInit(): void {
    this.getBlogsWithCardImage();
  }

}
