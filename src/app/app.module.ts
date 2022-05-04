import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { GuardianService } from './guardian/guardian.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NotRegisterModule } from './not-register/not-register.module';
import { WebModule } from './web/web.module';
import { AdminModule } from './admin/admin.module';
import { LoginModule } from './login/login.module';
import {AccordionModule} from 'primeng/accordion';  
import {MenuItem} from 'primeng/api';                  


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule, 
    NotRegisterModule,
    WebModule,
    AdminModule,
    NotRegisterModule,
    LoginModule,
    AccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
