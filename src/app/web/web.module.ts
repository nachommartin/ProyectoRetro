import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { WebRoutingModule } from './web-routing.module';
import { ResultadosComponent } from './resultados/resultados.component';



@NgModule({
  declarations: [
    NavbarComponent,
    MainComponent,
    ResultadosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WebRoutingModule
  ]
})
export class WebModule { }
