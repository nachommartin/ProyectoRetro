import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebRoutingModule } from './web-routing.module';
import { ResultadosComponent } from './resultados/resultados.component';
import { JuegoComponent } from './juego/juego.component';
import { ReviewComponent } from './review/review.component';
import { ChildComponent } from './child/child.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    NavbarComponent,
    MainComponent,
    ResultadosComponent,
    JuegoComponent,
    ReviewComponent,
    ChildComponent,
    UsuarioComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WebRoutingModule
  ]
})
export class WebModule { }
