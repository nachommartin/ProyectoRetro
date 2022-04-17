import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { WebModule } from '../web/web.module';



@NgModule({
  declarations: [
    PanelComponent
  ],
  imports: [
    CommonModule,
    WebModule
  ]
})
export class AdminModule { }
