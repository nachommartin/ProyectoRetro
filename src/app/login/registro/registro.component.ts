import { Component, OnInit } from '@angular/core';
import { AbstractControl, EmailValidator, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MailService } from '../services/mail.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public formGroup!: FormGroup;
  //Patrón para el correo
  public emailPattern   : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  //Patrón para la contraseña
  public passwordPattern  : string= "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$";
  



  constructor(private formBuilder: FormBuilder, private servicio: LoginService, 
    private router:Router, private validadorMail: MailService) { }

  ngOnInit(): void {

    this.buildForm();

    
  }

  // Constructor del formulario reactivo con sus respectivos campos y sus validadores asignados
  private buildForm(){
    this.formGroup = this.formBuilder.group({
      nick: ['', [Validators.required]],
      correo: ['',[      Validators.required, Validators.pattern(this.emailPattern)], [this.validadorMail]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)] ],
      repitePass: ['', [Validators.required] ]
    },     
    {validators: [ this.camposIguales('password','repitePass') ]
  }    
  )
  }

// Método para registrar un usuario
  public registrar() {
    const user = JSON.stringify(this.formGroup.value);
    this.servicio.registrar(JSON.parse(user)).subscribe({
    next: (resp => {
      Swal.fire(
        '', 'Se ha registrado correctamente', 'success'
      );
      this.router.navigateByUrl('/login');
  }),
  error: resp=> {
    Swal.fire(
      '¡Error!', 'Hubo un error inesperado', 'error'
    );
  }
  })
  // En un futuro los logs se modificarán para que se muestren en pantalla
}

//Método para mostrar los errores posibles de la validación del campo email
  get emailErrorMsg(): string {
    
    const errors = this.formGroup.get('correo')?.errors!;
    if ( errors['pattern'] ) {
      return 'Introduce un correo con un formato válido';
        }
    else if ( errors['emailTomado'] ) {
        return 'El correo electrónico ya está registrado';
        }

    return '';
  }

  
//Método para saber si el campo del formulario se ha rellenado correctamente según las validaciones
  campoNoValido( campo: string ) {
    return this.formGroup.get(campo)?.invalid
            && this.formGroup.get(campo)?.touched;
  }


  //Método para determinar si los campos de password y repite password (para una mayor garantía al
  //usuario) son iguales
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
