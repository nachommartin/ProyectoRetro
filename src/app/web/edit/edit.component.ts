import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import { NickService } from 'src/app/login/services/nick.service';
import Swal from 'sweetalert2';
import { Usuario } from '../interfaces/juego';
import { ServUserService } from '../services/serv-user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  usuario!: Usuario; 
  public formGroup!: FormGroup;
  public passwordPattern  : string= "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$";
  opcionElegida:string='';
  carga: boolean= false; 


  


  options:any[] = [
    { name: "Álava", id: "Alava" },
    { name: "Albacete", id: "Albacete" },
    { name: "Alicante", id: "Alicante" },
    { name: "Almería", id: "Almeria" },
    { name: "Asturias", id: "Asturias" },
    { name: "Ávila", id: "Avila" },
    { name: "Badajoz", id: "Badajoz" },
    { name: "Baleares", id: "Baleares" },
    { name: "Barcelona", id: "Barcelona" },
    { name: "Burgos", id: "Burgos" },
    { name: "Cáceres", id: "Caceres" },
    { name: "Cádiz", id: "Cadiz" },
    { name: "Cantabria", id: "Cantabria" },
    { name: "Castellón", id: "Castellon" },
    { name: "Ceuta", id: "Ceuta" },
    { name: "Ciudad Real", id: "Ciudad Real" },
    { name: "Córdoba", id: "Cordoba" },
    { name: "Coruña, La", id: "Corunha" },
    { name: "Cuenca", id: "Cuenca" },
    { name: "Gerona", id: "Gerona" },
    { name: "Granada", id: "Granada" },
    { name: "Guadalajara", id: "Guadalajara" },
    { name: "Guipúzcoa", id: "Guipuzcoa" },
    { name: "Huelva", id: "Huelva" },
    { name: "Huesca", id: "Huesca" },
    { name: "Jaén", id: "Jaen" },
    { name: "Las Palmas de Gran Canaria", id: "Las Palmas" },
    { name: "León", id: "Leon" },
    { name: "Lérida", id: "Lerida" },
    { name: "Lugo", id: "Lugo" },
    { name: "Madrid", id: "Madrid" },
    { name: "Málaga", id: "Malaga" },
    { name: "Melilla", id: "Melilla" },
    { name: "Murcia", id: "Murcia" },
    { name: "Navarra", id: "Navarra" },
    { name: "Orense", id: "Orense" },
    { name: "Palencia", id: "Palencia" },
    { name: "Pontevedra", id: "Pontevedra" },
    { name: "Rioja, La", id: "Rioja" },
    { name: "Salamanca", id: "Salamanca" },
    { name: "Santa Cruz de Tenerife", id: "Tenerife" },
    { name: "Segovia", id: "Segovia" },
    { name: "Sevilla", id: "Sevilla" },
    { name: "Soria", id: "Soria" },
    { name: "Tarragona", id: "Tarragona" },
    { name: "Teruel", id: "Teruel" },
    { name: "Toledo", id: "Toledo" },
    { name: "Valencia", id: "Valencia" },
    { name: "Valladolid", id: "Valladolid" },
    { name: "Vizcaya", id: "Vizcaya" },
    { name: "Zamora", id: "Zamora" },
    { name: "Zaragoza", id: "Zaragoza" }
  ]

  constructor(private servicioLogin: LoginService, private formBuilder: FormBuilder, private validadorNick: NickService,
    private router: Router, private userService:ServUserService) { }

  ngOnInit(): void {
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.carga=true
    }
    )

    this.buildForm();

  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      correoSource:[],
      nick: [, [Validators.required], [this.validadorNick]],
      ciudad: [],
      password: [, [Validators.minLength(6), Validators.pattern(this.passwordPattern)] ],
      repitePass: [ ]
    },     
    {validators: [ this.camposIguales('password','repitePass') ]
  }    
  )
  
  }

  
  selectOption(opcion:string) {
    this.opcionElegida=opcion;
  }

  public actualizar() {

    this.formGroup.patchValue({
      correoSource:this.usuario.correo
    })
    
    const user = JSON.stringify(this.formGroup.value);
    console.log(user)
    this.userService.actualizar(JSON.parse(user)).subscribe({
    next: (resp => {
      Swal.fire(
        '', 'Ha actualizado su perfil', 'success'
      );
      this.router.navigateByUrl('/usuario');
  }),
  error: resp=> {
    Swal.fire(
      '¡Error!', 'Hubo un error inesperado', 'error'
    );
  }
  })
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

  campoNoValido( campo: string ) {
    return this.formGroup.get(campo)?.invalid
            && this.formGroup.get(campo)?.touched;
  }

  get nickErrorMsg(): string {
    
    const errors = this.formGroup.get('nick')?.errors!;
    if ( errors['nickTomado'] ) {
        return 'Ese alias está siendo utilizando por otro usuario';
        }
    

    return '';
  }

}
