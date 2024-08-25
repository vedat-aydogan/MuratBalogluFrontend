import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr-service';
import { RoleService } from '../../services/common/models/role.service';
import { RoleModel } from '../../contracts/models/role-model';
import { MatSelectionList } from '@angular/material/list';
import { UserService } from '../../services/common/models/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrl: './authorize-user-dialog.component.css'
})
export class AuthorizeUserDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AuthorizeUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { userId: string, fullName: string },
    private spinnerService: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private roleService: RoleService,
    private userService: UserService,
  ) { }

  roles: RoleModel[];
  assignedRoles?: string[] = [];

  isRoleSelected(roleName: string): boolean {
    return this.assignedRoles?.includes(roleName);
  }

  assignRoles(selectionRoleList: MatSelectionList) {
    this.spinnerService.show();

    const roles: string[] = selectionRoleList.selectedOptions.selected.map(o => o.value);

    this.userService.assignRoleToUserAsync(roles, this.data.userId,
      () => {
        this.spinnerService.hide();

        this.toastrService.message("Kullanıcıya rol atama işlemi gerçekleşmiştir", "Başarılı", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
        });
      },
      (error: HttpErrorResponse) => {
        //Status kod olarak 500 döndürüldüğü için yorum satırı yapılmıştır. Tekrar 400 döndürülürse aktif hale getirilmelidir.
        // if ((error.status != 401) && (error.status != 403) && (error.status != 500)) {
        //   this.spinnerService.hide();

        //   this.toastrService.message(error.error.message, "Hata!", {
        //     messageType: ToastrMessageType.Error,
        //     position: ToastrPosition.TopCenter,
        //     timeOut: 5000
        //   });
        // }
      }
    );
  }

  async getRolesOfUserAsync(): Promise<string[]> {
    this.spinnerService.show();

    return this.userService.getRolesOfUserAsync(this.data.userId,
      () => {
        this.spinnerService.hide();
      },
      error => {
        this.dialogRef.close(AuthorizeUserDialogComponent);
      }
    );
  }

  async ngOnInit(): Promise<void> {
    this.roles = await this.roleService.getRolesAsync();
    this.assignedRoles = await this.getRolesOfUserAsync();
  }

}
