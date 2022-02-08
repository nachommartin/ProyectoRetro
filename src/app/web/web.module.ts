import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { WebRoutingModule } from './web-routing.module';



@NgModule({
  declarations: [
    NavbarComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WebRoutingModule
  ]
})
export class WebModule { }
