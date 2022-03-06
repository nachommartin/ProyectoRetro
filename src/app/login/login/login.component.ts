import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user = {

  email!: '',
  password!: ''
  }


  constructor(private servicio: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    this.servicio.login(this.user.email,this.user.password).subscribe({
      next: (resp => { 
      localStorage.setItem('token',resp.access_token)
      this.router.navigateByUrl('./main');
      console.log(resp)
  }),
  error: resp=> {
         
    Swal.fire('Error', resp.error.mensaje, 'error')
  }  });
}
//Si conseguimos una respuesta correcta de nuestro backend en la autenticación del login guardamos un token en nuestro local storage
//si no lo conseguimos, se nos mostrará un error personalizado de nuestro backen vía Sweet Alert
}
