import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import Swal from 'sweetalert2';
import { Usuario } from '../interfaces/juego';
import { ServUserService } from '../services/serv-user.service';

@Component({
  selector: 'app-creacion-lista',
  templateUrl: './creacion-lista.component.html',
  styleUrls: ['./creacion-lista.component.css']
})
export class CreacionListaComponent implements OnInit {

  usuario!:Usuario;
  carga:boolean=false;
  public formGroup!: FormGroup;



  constructor(private servicioLogin:LoginService, private formBuilder: FormBuilder,
    private servicioUser:ServUserService, private router: Router) { }

  ngOnInit(): void {

    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.carga=true;
    }
    )
    this.buildForm();

  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      nombre: [, Validators.required],
      publico: [, Validators.required],
    },        
  )
  
  }

  campoNoValido( campo: string ) {
    return this.formGroup.get(campo)?.invalid
            && this.formGroup.get(campo)?.touched;
  }

crear(){

  const auxLista = this.formGroup.value;

  this.servicioUser.crearLista(this.usuario.correo, auxLista.publico, auxLista.nombre).subscribe({
    next: (resp => {
      Swal.fire(
        '', 'Ahora añade tus juegos', 'success'
      );
      this.servicioUser.cargarListas(this.usuario.nick).subscribe((resp)=>{
        const size=resp.length;
        const referencia=resp[size-1].referencia 
        this.router.navigateByUrl('/lista/'+referencia);
      }
      )
  }),
  error: resp=> {
    Swal.fire(
      '¡Error!', 'Hubo un error inesperado', 'error'
    );
  }
  })

}

}
