import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { SpecialityService } from '../../../../services/common/models/speciality.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { SpecialityModel } from '../../../../contracts/models/speciality-model';
import { HttpErrorResponse } from '@angular/common/http';
import { SpecialityCategoryModel } from '../../../../contracts/models/speciality-category-model';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr-service';

@Component({
  selector: 'app-speciality-update',
  templateUrl: './speciality-update.component.html',
  styleUrl: './speciality-update.component.css'
})
export class SpecialityUpdateComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private specialityService: SpecialityService,
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

  specialityCategories: SpecialityCategoryModel[];
  specialityUpdateForm: FormGroup
  submitted: boolean;

  get component() {
    return this.specialityUpdateForm.controls;
  }

  updateSpecialityForm(): void {
    this.specialityUpdateForm = this.formbuilder.group({
      ckEditor: [this.speciality?.context, Validators.required],
      category: [this.speciality?.categoryId, Validators.required],
      title: [this.speciality?.title, Validators.required],
      cardContext: [this.speciality?.cardContext, [
        Validators.required,
        Validators.minLength(150),
        Validators.maxLength(200)
      ]]
    });
  }

  updateSpeciality() {
    this.submitted = true;
    if (this.specialityUpdateForm.invalid)
      return;

    this.spinnerService.show();

    const specialityModel: SpecialityModel = new SpecialityModel();
    specialityModel.id = this.id;
    specialityModel.title = this.specialityUpdateForm.value.title;
    specialityModel.cardContext = this.specialityUpdateForm.value.cardContext;
    specialityModel.context = this.specialityUpdateForm.value.ckEditor;
    specialityModel.categoryId = this.specialityUpdateForm.value.category;

    this.specialityService.updateSpeciality(specialityModel).subscribe({
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

  getSpecialityById(id: string): void {
    this.specialityService.getSpecialityById(id).subscribe({
      next: (data: SpecialityModel) => {
        this.speciality = data;
        this.updateSpecialityForm();
      },
      error: (error: HttpErrorResponse) => {
        this.toastrService.message(error.error.message, "Hata!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
        });
      }
    });
  }

  getSpecialityCategories() {
    this.spinnerService.show();

    this.specialityService.getSpecialityCategories().subscribe({
      next: (data: SpecialityCategoryModel[]) => {
        this.specialityCategories = data;

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.toastrService.message(error.error.message, "Hata!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
        });
      },
    });
  }

  ngOnInit(): void {
    this.updateSpecialityForm();
    this.getSpecialityById(this.id);
    this.getSpecialityCategories();
  }

}
