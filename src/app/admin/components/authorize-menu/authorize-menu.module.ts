import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuComponent } from './authorize-menu.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AuthorizeMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AuthorizeMenuModule { }
