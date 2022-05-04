import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import Swal from 'sweetalert2';
import { FollowCredentials, Usuario } from '../interfaces/juego';
import { AmistadService } from '../services/amistad.service';
import { BuscadorService } from '../services/buscador.service';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.css']
})
export class ComunidadComponent implements OnInit {

  usuarios: FollowCredentials[]=[];
  cadena:string= ''; 
  sizeArray:number=-1;
  numUsuarios:number=0;
  userAsk!:string; 



  constructor(private servicioLogin: LoginService ,private servicioBusqueda: BuscadorService, private servicioFollow: AmistadService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.userAsk=resp.correo; 
    }
    )
  }

  buscar(x:any){
    this.cadena= x.target.value

    this.servicioBusqueda.buscarUsuario(this.cadena,this.userAsk).subscribe((resp)=>{
      this.usuarios= resp;
      this.sizeArray=resp.length
      console.log(resp)
    } );
    this.router.navigateByUrl('/comunidad');
    

  }

  obtenerUsuarios(){
    this.servicioBusqueda.getUsers().subscribe((resp)=>{
      this.numUsuarios= resp.length;
    } );
    
  }

  follow(usuario:string){
    this.servicioFollow.followUsuario(usuario, this.userAsk).subscribe({
     next: (resp => {
       Swal.fire(
         '', 'Has seguido al usuario', 'success'
       );
       this.router.navigateByUrl('/comunidad');
   }),
   error: resp=> {
     Swal.fire(
       '¡Error!', 'Ha habido un error inesperado', 'error'
     );
   }
   })
 }

 unfollow(usuario:string){
  this.servicioFollow.unfollowUsuario(usuario, this.userAsk).subscribe({
   next: (resp => {
     Swal.fire(
       '', 'Has dejado de seguir al usuario', 'success'
     );
     this.router.navigateByUrl('/comunidad');
 }),
 error: resp=> {
   Swal.fire(
     '¡Error!', 'Ha habido un error inesperado', 'error'
   );
 }
 })

}

verVotos(usuario:string, nick:string){
  this.servicioFollow.verVotos(this.userAsk, usuario).subscribe({
    next: (resp => {
      this.router.navigateByUrl('/votos/'+nick);
  }),
  error: resp=> {
    Swal.fire(
      '¡Error!', 'Para ver sus votos debes de seguir a este usuario', 'error'
    );
  }
  })
}

 
mandarMensaje(nick:string){
  this.router.navigateByUrl('/mensaje/'+nick);
}

 

}
