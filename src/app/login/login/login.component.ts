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
      this.router.navigateByUrl('/main');
      console.log(resp)
<<<<<<< HEAD

=======
>>>>>>> 89fa43184ebf74eb0eb3600affc65810b8cf2890
  }),
  error: resp=> {
         
    Swal.fire('Error', resp.error.message, 'error')
  }  });
}

}
