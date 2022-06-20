import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';




@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ReactiveFormsModule, 
    ToastModule
  ],
  providers: [MessageService]

})
export class LoginModule { }
