import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpecialityCategoryAddModel } from '../../../../contracts/models/speciality-category-add-model';
import { SpecialityService } from '../../../../services/common/models/speciality.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpecialityCategoryModel } from '../../../../contracts/models/speciality-category-model';
import { SpecialityCategoryUpdateDialogComponent } from '../../../../dialogs/speciality-category-update-dialog/speciality-category-update-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../../../dialogs/delete-dialog/delete-dialog.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr-service';

@Component({
  selector: 'app-speciality-categories',
  templateUrl: './speciality-categories.component.html',
  styleUrl: './speciality-categories.component.css'
})
export class SpecialityCategoriesComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private specialityService: SpecialityService,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  specialityCategories: SpecialityCategoryModel[];
  specialityCategoryForm: FormGroup;
  submitted: boolean;

  get component() {
    return this.specialityCategoryForm.controls;
  }

  createSpecialityCategoryForm(): void {
    this.specialityCategoryForm = this.formbuilder.group({
      name: ["", Validators.required]
    });
  }

  addSpecialityCategory() {
    this.submitted = true;
    if (this.specialityCategoryForm.invalid)
      return;

    this.spinnerService.show();

    const model = new SpecialityCategoryAddModel();
    model.name = this.specialityCategoryForm.value.name;

    this.specialityService.addSpecialityCategory(model).subscribe({
      next: (data: any) => {
        this.spinnerService.hide();

        this.submitted = false;

        this.createSpecialityCategoryForm();

        this.getSpecialityCategories();

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

  updateSpecialityCategory(specialityCategory: SpecialityCategoryModel): void {
    this.dialog.open(SpecialityCategoryUpdateDialogComponent, {
      data: { id: specialityCategory.id, name: specialityCategory.name },
      width: '850px',
      // height: '400px'      
    });
  }

  deleteSpecialityCategory(id: string) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == DeleteState.Yes) {
        this.spinnerService.show();
        this.specialityService.deleteSpecialityCategory(id).subscribe({
          next: (data: any) => {
            this.spinnerService.hide();

            this.toastrService.message(data.message, "Başarılı", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopCenter,
              timeOut: 4000
            });

            this.getSpecialityCategories();
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
    this.createSpecialityCategoryForm();
    this.getSpecialityCategories();
  }

}
