import { Component, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { AboutMeService } from '../../../../services/common/models/about-me.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { AboutMeModel } from '../../../../contracts/models/about-me-model';
import { AboutMeAddModel } from '../../../../contracts/models/about-me-add-model';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr-service';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-about-me-add',
  templateUrl: './home-about-me-add.component.html',
  styleUrl: './home-about-me-add.component.css'
})
export class HomeAboutMeAddComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private aboutMeService: AboutMeService,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService,
    private formbuilder: FormBuilder,
    public dialog: MatDialog) {

    if (isPlatformBrowser(this.platformId)) {
      import('ckeditor5-custom-build/build/ckeditor').then(e => {
        this.Editor = e.default;
        this.isBrowser = true;
      });
    }

  }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: "aboutme",
    action: "upload",
    explanation: "Anasayfadaki hakkında kısmında gösterilecek olan hakkında resmi için resim ekleyin veya sürükleyip bırakın. ",
    accept: ".png, .jpg, .jpeg, .gif",
    multiple: true,
    optionalFileName: "op-dr-murat-baloglu-hakkinda"
  };

  aboutMe: AboutMeModel;

  public Editor: any;

  public isDisabled = false;

  public isBrowser = false;

  public model = {
    editorData: ''
  }

  public config = {
    placeholder: 'Oluşturmak istediğiniz hakkında içeriğini buraya yazınız. Boş bırakılamaz!'
  }

  homeAboutMeForm: FormGroup

  createHomeAboutMeForm(): void {
    this.homeAboutMeForm = this.formbuilder.group({
      ckEditor: [this.aboutMe?.homeContext, Validators.required]
    });
  }

  addHomeAboutMe() {
    const aboutMeAddModel: AboutMeAddModel = new AboutMeAddModel();
    aboutMeAddModel.homeContext = this.homeAboutMeForm.value.ckEditor;

    if (this.homeAboutMeForm.valid) {
      this.spinnerService.show();

      this.aboutMeService.addHomeAboutMe(aboutMeAddModel).subscribe({
        next: (data: AboutMeAddModel) => {
          this.spinnerService.hide();

          this.homeAboutMeForm.value.ckEditor = data.homeContext;

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
    else {
      this.toastrService.message("Hakkında içeriği boş bırakılamaz.", "Hata!", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopCenter,
        timeOut: 4000
      });
    }

  }

  getAboutMe() {
    this.spinnerService.show();

    this.aboutMeService.getAboutMe().subscribe({
      next: (data: AboutMeModel) => {
        if (data != null) {
          this.aboutMe = data;
          this.createHomeAboutMeForm();
        }

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.toastrService.message(error.error, "Hata!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
        });
      }
    });
  }

  ngOnInit(): void {
    this.createHomeAboutMeForm();
    this.getAboutMe();
  }

}
