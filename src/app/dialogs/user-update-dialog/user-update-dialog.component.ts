import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from '../../contracts/user/user-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr-service';
import { UserService } from '../../services/common/models/user.service';
import { ReloadService } from '../../services/common/reload.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrl: './user-update-dialog.component.css'
})
export class UserUpdateDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserUpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private formbuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private userService: UserService,
    private reloadService: ReloadService
  ) { }

  userUpdateForm: FormGroup;
  submitted: boolean;

  get component() {
    return this.userUpdateForm.controls;
  }

  updateUserForm(): void {
    this.userUpdateForm = this.formbuilder.group({
      firstName: [this.data.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: [this.data.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  updateUser() {
    this.submitted = true;
    if (this.userUpdateForm.invalid)
      return;

    this.spinnerService.show();

    const userModel: UserModel = new UserModel();
    userModel.id = this.data.id
    userModel.firstName = this.userUpdateForm.value.firstName;
    userModel.lastName = this.userUpdateForm.value.lastName;

    this.userService.updateUser(userModel).subscribe({
      next: async (data: any) => {
        this.spinnerService.hide();

        this.dialogRef.close();

        await this.reloadService.reloadAsync();

        this.toastrService.message(data.message, "Başarılı", {
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
            timeOut: 6000
          });
        }
      }
    });

  }

  ngOnInit(): void {
    this.updateUserForm();
  }

}
