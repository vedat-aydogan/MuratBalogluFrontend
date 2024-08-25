import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { BlogService } from '../../../../services/common/models/blog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BlogModel } from '../../../../contracts/models/blog-model';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr-service';

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrl: './blog-update.component.css'
})
export class BlogUpdateComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private blogService: BlogService,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService,
    private formbuilder: FormBuilder) {

    if (isPlatformBrowser(this.platformId)) {
      import('ckeditor5-custom-build/build/ckeditor').then(e => {
        this.Editor = e.default;
        this.isBrowser = true;
      });
    }

  }

  @Input() id: string;

  blog: BlogModel;

  public Editor: any;

  public isDisabled = false;

  public isBrowser = false;

  public model = {
    editorData: ''
  }

  public config = {
    placeholder: 'Oluşturmak istediğiniz blog içeriğini buraya yazınız. Boş bırakılamaz!'
  }

  blogUpdateForm: FormGroup
  submitted: boolean;

  get component() {
    return this.blogUpdateForm.controls;
  }

  updateBlogForm(): void {
    this.blogUpdateForm = this.formbuilder.group({
      ckEditor: [this.blog?.context, Validators.required],
      title: [this.blog?.title, Validators.required],
      cardContext: [this.blog?.cardContext, [
        Validators.required,
        Validators.minLength(150),
        Validators.maxLength(200)
      ]]
    });
  }

  updateBlog() {
    this.submitted = true;
    if (this.blogUpdateForm.invalid)
      return;

    this.spinnerService.show();

    const blogModel: BlogModel = new BlogModel();
    blogModel.id = this.id;
    blogModel.title = this.blogUpdateForm.value.title;
    blogModel.cardContext = this.blogUpdateForm.value.cardContext;
    blogModel.context = this.blogUpdateForm.value.ckEditor;

    this.blogService.updateBlog(blogModel).subscribe({
      next: (data: any) => {
        this.spinnerService.hide();

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

  getBlogById(id: string): void {
    this.blogService.getBlogById(id).subscribe({
      next: (data: BlogModel) => {
        this.blog = data;
        this.updateBlogForm();
      },
      error: (error: HttpErrorResponse) => {
        this.toastrService.message(error.error, "Hata!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
        });
      }
    });
  }

  ngOnInit(): void {
    this.updateBlogForm();
    this.getBlogById(this.id);
  }

}
