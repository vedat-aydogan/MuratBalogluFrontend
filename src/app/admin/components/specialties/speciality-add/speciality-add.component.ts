import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { SpecialityService } from '../../../../services/common/models/speciality.service';
import { SpecialityAddModel } from '../../../../contracts/models/speciality-add-model';

@Component({
  selector: 'app-speciality-add',
  templateUrl: './speciality-add.component.html',
  styleUrl: './speciality-add.component.css'
})
export class SpecialityAddComponent implements OnInit {

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

  public Editor: any;

  public isDisabled = false;

  public isBrowser = false;

  public model = {
    editorData: ''
  }

  public config = {
    placeholder: 'Oluşturmak istediğiniz uzmanlık içeriğini buraya yazınız. Boş bırakılamaz!'
  }

  specialityForm: FormGroup

  createSpecialityForm(): void {
    this.specialityForm = this.formbuilder.group({
      ckEditor: ["", Validators.required],
      title: ["", Validators.required],
      cardContext: ["", [
        Validators.required,
        Validators.minLength(150),
        Validators.maxLength(200)
      ]]
    });
  }

  addSpeciality() {
    const specialityAddModel: SpecialityAddModel = new SpecialityAddModel();
    specialityAddModel.title = this.specialityForm.value.title;
    specialityAddModel.cardContext = this.specialityForm.value.cardContext;
    specialityAddModel.context = this.specialityForm.value.ckEditor;

    if (this.specialityForm.valid) {
      this.spinnerService.show();

      this.specialityService.addSpeciality(specialityAddModel).subscribe({
        next: (data: any) => {
          this.spinnerService.hide();

          this.createSpecialityForm();

          this.alertifyService.message("Uzmanlık başarılı bir şekilde oluşturulmuştur.", {
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

  ngOnInit(): void {
    this.createSpecialityForm();
  }

}
