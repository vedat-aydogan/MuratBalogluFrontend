import { Component, OnInit } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserModel } from '../../../contracts/user/user-model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/common/models/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizeUserDialogComponent } from '../../../dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { DeleteDialogComponent, DeleteState } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { UserUpdateDialogComponent } from '../../../dialogs/user-update-dialog/user-update-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  constructor(
    // private formbuilder: FormBuilder,
    private userService: UserService,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  users: UserModel[];

  getUsers() {
    this.spinnerService.show();

    this.userService.getUsers().subscribe({
      next: (data: UserModel[]) => {
        this.users = data;

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        if ((error.status != 401) && (error.status != 403) && (error.status != 500)) {
          this.spinnerService.hide();

          this.toastrService.message(error.error.message, "Hata!", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopCenter,
            timeOut: 5000
          });
        }
      },
    });
  }

  async getUsersAsync() {
    this.spinnerService.show();

    const datas: UserModel[] = await this.userService.getUsersAsync(
      () => this.spinnerService.hide(),
      (error: HttpErrorResponse) => {
        if ((error.status != 401) && (error.status != 403) && (error.status != 500)) {
          this.spinnerService.hide();

          this.toastrService.message(error.error.message, "Hata!", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopCenter,
            timeOut: 5000
          });
        }
      }
    );

    this.users = datas;
  }

  assignRole(id: string, fullName: string) {
    this.dialog.open(AuthorizeUserDialogComponent, {
      // data: id,
      data: { userId: id, fullName: fullName },
      width: '850px',
      // height: '400px'      
    });
  }

  updateUser(user: UserModel): void {
    this.dialog.open(UserUpdateDialogComponent, {
      data: { id: user.id, firstName: user.firstName, lastName: user.lastName },
      width: '850px',
      // height: '400px'      
    });
  }

  deleteUser(id: string) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == DeleteState.Yes) {
        this.spinnerService.show();

        this.userService.deleteUser(id).subscribe({
          next: (data: any) => {
            this.spinnerService.hide();

            this.getUsersAsync();

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
    });

  }

  // ngOnInit(): void {
  //   this.createRoleForm();
  //   this.getRolesAsync();
  // }

  async ngOnInit(): Promise<void> {
    await this.getUsersAsync();
  }

}
