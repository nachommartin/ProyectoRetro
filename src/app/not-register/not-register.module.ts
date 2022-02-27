import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { DatosComponent } from './datos/datos.component';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    InicioComponent,
    DatosComponent
  ],
  imports: [
    CommonModule, 
    DataTablesModule

  ]
})
export class NotRegisterModule { }
