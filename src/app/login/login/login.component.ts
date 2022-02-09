import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validPattern = "^[a-zA-Z0-9]{10}$";

  miFormulario: FormGroup = this.fb.group({

  email:  ['', [Validators.required, Validators.email ]],
  password: ['', [Validators.required, Validators.pattern(this.validPattern)]]

  })


  constructor(private servicio: LoginService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login() {
    const { email, password } = this.miFormulario.value;

    this.servicio.login(email,password).subscribe({
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
