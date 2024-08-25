import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BlogService } from '../../../../services/common/models/blog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogAddModel } from '../../../../contracts/models/blog-add-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { _isAuthenticated } from '../../../../services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr-service';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrl: './blog-add.component.css'
})
export class BlogAddComponent implements OnInit {

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

  public Editor: any;

  public isDisabled = false;

  public isBrowser = false;

  public model = {
    editorData: ''
  }

  public config = {
    placeholder: 'Oluşturmak istediğiniz blog içeriğini buraya yazınız. Boş bırakılamaz!',
  }

  blogForm: FormGroup
  submitted: boolean;

  get component() {
    return this.blogForm.controls;
  }

  createBlogForm(): void {
    this.blogForm = this.formbuilder.group({
      ckEditor: ["", Validators.required],
      title: ["", Validators.required],
      cardContext: ["", [
        Validators.required,
        Validators.minLength(150),
        Validators.maxLength(200)
      ]]
    });
  }

  addBlog() {
    this.submitted = true;
    if (this.blogForm.invalid)
      return;

    this.spinnerService.show();

    const blogAddModel: BlogAddModel = new BlogAddModel();
    blogAddModel.title = this.blogForm.value.title;
    blogAddModel.cardContext = this.blogForm.value.cardContext;
    blogAddModel.context = this.blogForm.value.ckEditor;

    this.blogService.addBlog(blogAddModel).subscribe({
      next: (data: any) => {
        this.spinnerService.hide();

        this.submitted = false;
        this.createBlogForm();

        this.toastrService.message("Yükleme işlemi gerçekleşmiştir", "Başarılı", {
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

  ngOnInit(): void {
    this.createBlogForm();
  }

}
