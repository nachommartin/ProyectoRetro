import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private servicioLogin: LoginService) { }

  ngOnInit(): void {
  }

  logout(){
    this.servicioLogin.logout(); 
  }

}
