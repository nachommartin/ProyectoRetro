import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { WebRoutingModule } from './web-routing.module';
import { ResultadosComponent } from './resultados/resultados.component';
import { JuegoComponent } from './juego/juego.component';
import { ReviewComponent } from './review/review.component';



@NgModule({
  declarations: [
    NavbarComponent,
    MainComponent,
    ResultadosComponent,
    JuegoComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WebRoutingModule
  ]
})
export class WebModule { }
