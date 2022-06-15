import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
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
  pages: number = 1;
  home!:MenuItem; 
  items:MenuItem[]=[]



  constructor(private servicioLogin: LoginService ,private servicioBusqueda: BuscadorService, private servicioFollow: AmistadService, private router: Router) { }

  ngOnInit(): void {
    this.datos()
    this.home = {icon: 'pi pi-home', routerLink: '/main'};

  }

  datos(){
    this.obtenerUsuarios();
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.userAsk=resp.correo; 
      this.items = [
        {label: 'Comunidad', routerLink:'/comunidad'},
    ];
    }
    )
  }

  buscar(x:any){
    this.cadena= x.target.value

    this.servicioBusqueda.buscarUsuario(this.cadena,this.userAsk).subscribe((resp)=>{
      this.usuarios= resp;
      this.sizeArray=resp.length
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
       this.usuarios=[]
       this.servicioBusqueda.buscarUsuario(this.cadena,this.userAsk).subscribe((resp)=>{
        this.usuarios= resp;
        this.sizeArray=resp.length
      } );
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
     this.usuarios=[]
     this.servicioBusqueda.buscarUsuario(this.cadena,this.userAsk).subscribe((resp)=>{
      this.usuarios= resp;
      this.sizeArray=resp.length
    } );
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

verListas(nick:string){
  this.router.navigateByUrl('/listas/'+nick);
}

obtenerAvatar(usuario:Usuario){
  const base64String = btoa(String.fromCharCode(...new Uint8Array(usuario.avatar)));
  const source = `data:image/png;base64,${base64String}`+usuario.avatar;
  return source;
}


}
