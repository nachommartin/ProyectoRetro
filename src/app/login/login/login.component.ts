import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


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

    this.servicio.login(this.email,this.password).subscribe({
      next: (resp => {
      localStorage.setItem('token',resp.access_token!)
      this.router.navigateByUrl('/main');
  }),
  error: resp=> {
         
    Swal.fire('Error', resp.error.message, 'error')
  }
  
  });
}

}
