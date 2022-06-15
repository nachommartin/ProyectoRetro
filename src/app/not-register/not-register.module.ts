import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { DatosComponent } from './datos/datos.component';
import { DataTablesModule } from 'angular-datatables';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import { WebModule } from '../web/web.module';






@NgModule({
  declarations: [
    InicioComponent,
    DatosComponent
  ],
  imports: [
    CommonModule, 
    DataTablesModule,
    TableModule,
    PanelModule, 
    MenuModule,
    ButtonModule,
    WebModule

  ]
})
export class NotRegisterModule { }
