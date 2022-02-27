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
    NotRegisterModule
  ],
  providers: [],
  bootstrap: [AppComponent, GuardianService]
})
export class AppModule { }
