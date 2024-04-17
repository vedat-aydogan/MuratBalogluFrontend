import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { SpecialityService } from '../../../../services/common/models/speciality.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { SpecialityModel } from '../../../../contracts/models/speciality-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-speciality-update',
  templateUrl: './speciality-update.component.html',
  styleUrl: './speciality-update.component.css'
})
export class SpecialityUpdateComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private specialityService: SpecialityService,
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

  @Input() id: string;

  speciality: SpecialityModel;

  public Editor: any;

  public isDisabled = false;

  public isBrowser = false;

  public model = {
    editorData: ''
  }

  public config = {
    placeholder: 'Oluşturmak istediğiniz uzmanlık içeriğini buraya yazınız. Boş bırakılamaz!'
  }

  specialityUpdateForm: FormGroup

  updateSpecialityForm(): void {
    this.specialityUpdateForm = this.formbuilder.group({
      ckEditor: [this.speciality?.context, Validators.required],
      title: [this.speciality?.title, Validators.required],
      cardContext: [this.speciality?.cardContext, [
        Validators.required,
        Validators.minLength(150),
        Validators.maxLength(200)
      ]]
    });
  }

  updateSpeciality() {
    const specialityModel: SpecialityModel = new SpecialityModel();
    specialityModel.id = this.id;
    specialityModel.title = this.specialityUpdateForm.value.title;
    specialityModel.cardContext = this.specialityUpdateForm.value.cardContext;
    specialityModel.context = this.specialityUpdateForm.value.ckEditor;

    if (this.specialityUpdateForm.valid) {
      this.spinnerService.show();

      this.specialityService.updateSpeciality(specialityModel).subscribe({
        next: (data: any) => {
          this.spinnerService.hide();

          this.alertifyService.message("Uzmanlık başarılı bir şekilde güncellenmiştir.", {
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
      this.alertifyService.message("Hiç bir alan boş bırakılamaz ve uzmanlık kartı içeriği en az 150, en fazla 200 karakter olmalıdır.", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopCenter,
        delay: 7
      });
    }

  }

  getSpecialityById(id: string): void {
    this.specialityService.getSpecialityById(id).subscribe({
      next: (data: SpecialityModel) => {
        this.speciality = data;
        this.updateSpecialityForm();
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

  ngOnInit(): void {
    this.updateSpecialityForm();
    this.getSpecialityById(this.id);
  }

}
