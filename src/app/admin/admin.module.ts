import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { WebModule } from '../web/web.module';
import { TableModule } from 'primeng/table';
import { TablaJuegosComponent } from './tabla-juegos/tabla-juegos.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from "primeng/dialog";
import { RatingModule } from "primeng/rating";
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 



@NgModule({
  declarations: [
    PanelComponent,
    TablaJuegosComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    WebModule,
    ConfirmDialogModule,
    FormsModule,
    DialogModule,
    RatingModule, 
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    InputTextModule,
    CardModule,
    PaginatorModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
