import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BlogService } from '../../../../services/common/models/blog.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogAddModel } from '../../../../contracts/models/blog-add-model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrl: './blog-add.component.css'
})
export class BlogAddComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private blogService: BlogService,
    private alertifyService: AlertifyService,
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
    const blogAddModel: BlogAddModel = new BlogAddModel();
    blogAddModel.title = this.blogForm.value.title;
    blogAddModel.cardContext = this.blogForm.value.cardContext;
    blogAddModel.context = this.blogForm.value.ckEditor;

    if (this.blogForm.valid) {
      this.spinnerService.show();

      this.blogService.addBlog(blogAddModel).subscribe({
        next: (data: any) => {
          this.spinnerService.hide();

          this.createBlogForm();

          this.alertifyService.message("Blog başarılı bir şekilde ile oluşturulmuştur.", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          });
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
    else {
      this.alertifyService.message("Hiç bir alan boş bırakılamaz ve blog kartı içeriği en az 150, en fazla 200 karakter olmalıdır.", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopCenter,
        delay: 7
      });
    }

  }

  ngOnInit(): void {
    this.createBlogForm();
  }

}
