import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ApplicationService } from '../../../services/common/models/application.service';
import { AuthorizeMenuDialogComponent } from '../../../dialogs/authorize-menu-dialog/authorize-menu-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

interface ITreeMenu {
  name?: string
  actions?: ITreeMenu[];
  code?: string;
  menuName?: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrl: './authorize-menu.component.css'
})
export class AuthorizeMenuComponent implements OnInit {

  constructor(
    private applicationService: ApplicationService,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  private _transformer = (menu: ITreeMenu, level: number) => {
    return {
      // expandable: !!menu.actions && menu.actions.length > 0, //Bunuda kullanabiliriz
      expandable: menu.actions?.length > 0,
      name: menu.name,
      level: level,
      code: menu.code,
      menuName: menu.menuName
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    menu => menu.level,
    menu => menu.expandable,
    menu => menu.actions
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  assignRole(code: string, name: string, menuName: string) {
    this.dialog.open(AuthorizeMenuDialogComponent, {
      // data: code,
      // data: { code, name },
      data: { code: code, name: name, menuName: menuName },
      width: '850px',
      // height: '400px'      
    });
  }

  async ngOnInit(): Promise<void> {
    this.spinnerService.show();

    this.dataSource.data = (await this.applicationService.getAuthorizeDefinitionEndpointsAsync(
      () => this.spinnerService.hide(),
      (error: HttpErrorResponse) => {
        if ((error.status != 401) && (error.status != 403) && (error.status != 500)) {
          this.spinnerService.hide();

          this.toastrService.message(error.error.message, "Hata!", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopCenter,
            timeOut: 4000
          });
        }
      }
    )).map(m => {
      const treeMenu: ITreeMenu = {
        name: m.name,
        actions: m.actions.map(a => {
          const _treeMenu: ITreeMenu = {
            name: a.definition,
            code: a.code,
            menuName: m.name
          }
          return _treeMenu;
        }),
      }
      return treeMenu;
    });
  }

}
