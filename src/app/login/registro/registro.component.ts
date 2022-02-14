import { Component, OnInit } from '@angular/core';
import { AbstractControl, EmailValidator, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MailService } from '../services/mail.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public formGroup!: FormGroup;
  public emailPattern   : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public passwordPattern  : string= "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$";
  



  constructor(private formBuilder: FormBuilder, private servicio: LoginService, 
    private router:Router, private validadorMail: MailService) { }

  ngOnInit(): void {

    this.buildForm();

    
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      nick: '',
      email: ['',[      Validators.required, Validators.pattern(this.emailPattern)], [this.validadorMail]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)] ],
      repitePass: ['', [Validators.required] ]
    },     
    {validators: [ this.camposIguales('password','repitePass') ]
  }    
  )
  }

  public registrar() {
    const user = JSON.stringify(this.formGroup.value);
    console.log(user)
    this.servicio.registrar(JSON.parse(user)).subscribe({
    next: (resp => {
      console.log("Usuario registrado correctamente")
      this.router.navigateByUrl('/login');
  }),
  error: resp=> {
         
    console.log('Error inesperado')
  }
  })
}

  get emailErrorMsg(): string {
    
    const errors = this.formGroup.get('email')?.errors!;
    if ( errors['pattern'] ) {
      return 'Introduce un correo con un formato válido';
        }
    else if ( errors['emailTomado'] ) {
        return 'El email ya está registrado';
        }

    return '';
  }

  

  campoNoValido( campo: string ) {
    return this.formGroup.get(campo)?.invalid
            && this.formGroup.get(campo)?.touched;
  }


  
  camposIguales( campo1: string, campo2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if ( pass1 !== pass2 ) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true }
      } 



      formGroup.get(campo2)?.setErrors(null);

      return null
    }

  }

 
}
