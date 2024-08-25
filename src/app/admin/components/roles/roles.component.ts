import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteDialogComponent, DeleteState } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { RoleService } from '../../../services/common/models/role.service';
import { RoleModel } from '../../../contracts/models/role-model';
import { RoleAddModel } from '../../../contracts/models/role-add-model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  constructor(
    private formbuilder: FormBuilder,
    private roleService: RoleService,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  roles: RoleModel[];
  roleForm: FormGroup;
  submitted: boolean;

  get component() {
    return this.roleForm.controls;
  }

  createRoleForm(): void {
    this.roleForm = this.formbuilder.group({
      name: ["", Validators.required]
    });
  }

  addRoleAsync() {
    this.submitted = true;
    if (this.roleForm.invalid)
      return;

    this.spinnerService.show();

    const model = new RoleAddModel();
    model.name = this.roleForm.value.name;

    this.roleService.addRoleAsync(model, (response) => {
      console.log(response);

      this.spinnerService.hide();

      this.submitted = false;

      this.createRoleForm();

      this.getRolesAsync();

      this.toastrService.message(response.message, response.messageCode, {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopCenter,
        timeOut: 4000
      });
    }, (error: HttpErrorResponse) => {
      if ((error.status != 401) && (error.status != 403) && (error.status != 500)) {
        this.spinnerService.hide();

        this.toastrService.message(error.error.messageDescription, error.error.messageCode, {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 6000
        });
      }
    });
  }

  addRole() {
    this.submitted = true;
    if (this.roleForm.invalid)
      return;

    this.spinnerService.show();

    const model = new RoleAddModel();
    model.name = this.roleForm.value.name;

    this.roleService.addRole(model).subscribe({
      next: (response: any) => {
        this.spinnerService.hide();

        this.submitted = false;

        this.createRoleForm();

        this.getRoles();

        this.toastrService.message(response.message, response.messageCode, {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
        });
      },
      error: (error: HttpErrorResponse) => {
        if ((error.status != 401) && (error.status != 403) && (error.status != 500)) {
          this.spinnerService.hide();

          this.toastrService.message(error.error.messageDescription, error.error.messageCode, {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopCenter,
            timeOut: 4000
          });
        }
      }
    });

  }

  getRoles() {
    this.spinnerService.show();

    this.roleService.getRoles().subscribe({
      next: (data: RoleModel[]) => {
        this.roles = data;
        this.spinnerService.hide();
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
      },
    });
  }

  async getRolesAsync() {
    this.spinnerService.show();

    const datas: RoleModel[] = await this.roleService.getRolesAsync(
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

    this.roles = datas;
  }

  // updateRole(role: RoleModel): void {
  //   this.dialog.open(RoleUpdateDialogComponent, {
  //     data: { id: role.id, name: role.name },
  //     width: '850px',
  //     // height: '400px'      
  //   });
  // }

  deleteRole(id: string) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == DeleteState.Yes) {
        this.spinnerService.show();

        this.roleService.deleteRole(id).subscribe({
          next: (data: any) => {
            this.spinnerService.hide();

            this.getRolesAsync();

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

  async ngOnInit(): Promise<void> {
    this.createRoleForm();
    await this.getRolesAsync();
  }

}
