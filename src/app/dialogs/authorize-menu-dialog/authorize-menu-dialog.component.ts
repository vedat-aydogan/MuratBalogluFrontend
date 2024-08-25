import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr-service';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleService } from '../../services/common/models/role.service';
import { RoleModel } from '../../contracts/models/role-model';
import { MatSelectionList } from '@angular/material/list';
import { AuthorizationEndpointService } from '../../services/common/models/authorization-endpoint.service';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrl: './authorize-menu-dialog.component.css'
})
export class AuthorizeMenuDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { code: string, name: string, menuName: string },
    private spinnerService: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private roleService: RoleService,
    private authorizationEndpointService: AuthorizationEndpointService
  ) { }

  // datas = this.data;
  roles: RoleModel[];
  assignedRoles?: string[] = [];

  isRoleSelected(roleName: string): boolean {
    return this.assignedRoles?.includes(roleName);
  }

  assignRoles(selectionRoleList: MatSelectionList) {
    this.spinnerService.show();

    const roles: string[] = selectionRoleList.selectedOptions.selected.map(o => o.value);

    this.authorizationEndpointService.assignRoleToEndpointAsync(roles, this.data.code, this.data.menuName,
      () => {
        this.spinnerService.hide();

        this.toastrService.message("Endpointe rol atama işlemi gerçekleşmiştir", "Başarılı", {
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

  // async getRolesOfEndpointAsync(): Promise<any> {
  //   return this.authorizationEndpointService.getRolesOfEndpointAsync(this.data.code, this.data.menuName);
  // }

  async getRolesOfEndpointAsync(): Promise<any> {
    this.spinnerService.show();

    return this.authorizationEndpointService.getRolesOfEndpointAsync(this.data.code, this.data.menuName,
      () => {
        this.spinnerService.hide();
      },
      error => {
        this.dialogRef.close(AuthorizeMenuDialogComponent);
      }
    );
  }

  async ngOnInit(): Promise<void> {
    // this.assignedRoles = await this.authorizationEndpointService.getRolesOfEndpointAsync(this.data.code, this.data.menuName);
    this.roles = await this.roleService.getRolesAsync();
    this.assignedRoles = await this.getRolesOfEndpointAsync();
  }

}
