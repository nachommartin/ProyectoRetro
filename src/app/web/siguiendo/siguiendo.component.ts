import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/services/login.service';
import Swal from 'sweetalert2';
import { Amistad, Usuario } from '../interfaces/juego';
import { AmistadService } from '../services/amistad.service';

@Component({
  selector: 'app-siguiendo',
  templateUrl: './siguiendo.component.html',
  styleUrls: ['./siguiendo.component.css']
})
export class SiguiendoComponent implements OnInit {

  usuario!: Usuario;
  carga:boolean=false;  
  seguidos: Amistad[]=[];

  constructor(private servicioLogin:LoginService, private servicioFollow:AmistadService) { }

  ngOnInit(): void {

    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.carga=true
      this.cargarSeguidos()

    }
    )
  }

  unfollow(usuario:string){
    this.servicioFollow.unfollowUsuario(usuario, this.usuario.correo).subscribe({
     next: (resp => {
       Swal.fire(
         '', 'Has dejado de seguir al usuario', 'success'
       );
   }),
   error: resp=> {
     Swal.fire(
       '¡Error!', 'Ha habido un error inesperado', 'error'
     );
   }
   })
  
  }

  cargarSeguidos(){
    this.servicioFollow.getSeguidos(this.usuario.correo).subscribe((resp)=>
    this.seguidos=resp)

  }
  

}
