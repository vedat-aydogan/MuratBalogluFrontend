import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../../services/common/models/blog.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { BlogModel } from '../../../../contracts/models/blog-model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { BlogImageAddDialogComponent } from '../../../../dialogs/blog-image-add-dialog/blog-image-add-dialog.component';
import { BlogWithCardImageModel } from '../../../../contracts/models/blog-with-card-image-model';
import { DeleteDialogComponent, DeleteState } from '../../../../dialogs/delete-dialog/delete-dialog.component';
import { BlogImageListDialogComponent } from '../../../../dialogs/blog-image-list-dialog/blog-image-list-dialog.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {

  constructor(
    private blogService: BlogService,
    private alertifyService: AlertifyService,
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

  uploadBlogImages(id: string, title: string) {
    const dialogRef = this.dialog.open(BlogImageListDialogComponent, {
      data: { id: id, title: title }
    });
  }

  getBlogs() {

    this.spinnerService.show();

    this.blogService.getBlogs().subscribe({
      next: (data: BlogModel[]) => {
        this.blogs = data;

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.alertifyService.message(error.error, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
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

        this.alertifyService.message(error.error, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
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
        this.blogService.deleteBlog(id).subscribe({
          next: (data: any) => {
            this.alertifyService.message("Silme işlemi başarı ile gerçekleşmiştir.", {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            });
            this.getBlogsWithCardImage();
          },
          error: (error: HttpErrorResponse) => {
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

  //BlogModel parametereden gonderilecek.
  updateBlog() {
    const blogModel: BlogModel = new BlogModel();
    blogModel.id = "954C61E2-82FC-4A9B-7AA4-08DC0FC9C2F2"
    blogModel.title = "Title 6";
    blogModel.context = "Context 6";

    this.blogService.updateBlog(blogModel).subscribe({
      next: (data: any) => {
        this.alertifyService.message("Başarı ile güncellenmiştir.", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
      },
      error: (error: HttpErrorResponse) => {
        this.alertifyService.message(error.message, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    });
  }

  ngOnInit(): void {
    this.getBlogsWithCardImage();
  }

}
