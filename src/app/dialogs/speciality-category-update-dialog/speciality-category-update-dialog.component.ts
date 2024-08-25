import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpecialityCategoryModel } from '../../contracts/models/speciality-category-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpecialityService } from '../../services/common/models/speciality.service';
import { ReloadService } from '../../services/common/reload.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr-service';

@Component({
  selector: 'app-speciality-category-update-dialog',
  templateUrl: './speciality-category-update-dialog.component.html',
  styleUrl: './speciality-category-update-dialog.component.css'
})
export class SpecialityCategoryUpdateDialogComponent {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SpecialityCategoryUpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: SpecialityCategoryModel,
    private formbuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private specialityService: SpecialityService,
    private reloadService: ReloadService
  ) { }

  specialityCategoryUpdateForm: FormGroup;
  submitted: boolean;

  get component() {
    return this.specialityCategoryUpdateForm.controls;
  }

  updateSpecialityCategoryForm(): void {
    this.specialityCategoryUpdateForm = this.formbuilder.group({
      name: [this.data.name, Validators.required]
    });
  }

  updateSpecialityCategory() {
    this.submitted = true;
    if (this.specialityCategoryUpdateForm.invalid)
      return;

    this.spinnerService.show();

    const specialityCategoryModel: SpecialityCategoryModel = new SpecialityCategoryModel();
    specialityCategoryModel.id = this.data.id
    specialityCategoryModel.name = this.specialityCategoryUpdateForm.value.name;

    this.specialityService.updateSpecialityCategory(specialityCategoryModel).subscribe({
      next: async (data: any) => {
        this.spinnerService.hide();

        this.dialogRef.close();

        await this.reloadService.reloadAsync();

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

  ngOnInit(): void {
    this.updateSpecialityCategoryForm();
  }

}
