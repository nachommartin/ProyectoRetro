import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;



  constructor(private servicio: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.servicio.login(this.email,this.password).subscribe( resp => {
      localStorage.setItem('jwt',JSON.stringify(resp))
      this.router.navigateByUrl('/');
  });
}

}
